package io.shocker.gamelog.service;

import io.shocker.gamelog.config.WebEnum;
import io.shocker.gamelog.crawler.BasicCrawler;
import io.shocker.gamelog.crawler.GameCrawler;
import io.shocker.gamelog.model.GameCategories;
import io.shocker.gamelog.model.Games;
import io.shocker.gamelog.model.SpecDetail;
import io.shocker.gamelog.model.Tag;
import io.shocker.gamelog.repository.GameCategoryRepository;
import io.shocker.gamelog.repository.GameRepository;
import io.shocker.gamelog.repository.TagRepository;
import org.springframework.stereotype.Service;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.TransformerException;
import javax.xml.transform.stream.StreamSource;
import java.util.List;

@Service
public class GameService {
    private final GameCategoryRepository gameCategoryRepository;
    private final GameRepository gameRepository;
    private final TagRepository tagRepository;

    public GameService(GameCategoryRepository gameCategoryRepository, GameRepository gameRepository, TagRepository tagRepository) {
        this.gameCategoryRepository = gameCategoryRepository;
        this.gameRepository = gameRepository;
        this.tagRepository = tagRepository;
    }

    public List<GameCategories.GameCategory> getAllCategories() {
        return this.gameCategoryRepository.findAll();
    }

    public GameCategories.GameCategory addCategory(GameCategories.GameCategory gameCategory) {
        return this.gameCategoryRepository.save(gameCategory);
    }

    public int crawlGameCategory() {
        int count = 0;

        try {
            StreamSource streamResult =
                    getGamesCategoryData();
            System.out.println("Found Source");
            if (streamResult != null) {

                JAXBContext jaxbContext = JAXBContext.newInstance("io.shocker.gamelog.model");
                Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

                GameCategories gameCategory = (GameCategories) unmarshaller.unmarshal(streamResult.getInputStream());
                List<GameCategories.GameCategory> list = gameCategory.getCategory();
                for (GameCategories.GameCategory category : list) {
                    GameCategories.GameCategory existed = this.gameCategoryRepository.findByName(category.getName());
                    if (existed != null) {
                        category.setId(existed.getId());
                    }
                    this.addCategory(category);
                    count++;
                }
                System.out.println("Added Source");

            }
        } catch (TransformerException e) {
            e.printStackTrace();
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        return count;
    }

    private StreamSource getGamesCategoryData() throws TransformerException {
        BasicCrawler crawler = new BasicCrawler();

        return crawler.crawlingFromWeb(WebEnum.GameCategory);
    }


    public int crawlGame() {
        int count = 0;

        try {

            WebEnum webEnum = WebEnum.Game;
            webEnum.setUrl("https://store.steampowered.com/tags/en/Action/");
            StreamSource streamResult =
                    getGamesData(webEnum);
            System.out.println("Found Source");
            if (streamResult != null) {

                JAXBContext jaxbContext = JAXBContext.newInstance("io.shocker.gamelog.model");
                Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

                Games games = (Games) unmarshaller.unmarshal(streamResult.getInputStream());
                List<Games.Game> list = games.getGame();
                for (Games.Game game : list) {

                    if (game.getId() != null) {
                        System.out.print("|" + game.getId() + "=" + "," + game.getName() + " tag: ");
                        for (String tag : game.getTags().getTag()) {
                            Tag existedTag = this.tagRepository.getByName(tag);
                            if (existedTag==null){
                                existedTag = new Tag();
                                existedTag.setName(tag);
                                this.tagRepository.save(existedTag);
                            }
                            System.out.print(existedTag.getId() + ", ");
                        }
                        if (game.getSpecs().getMinimum()!=null) {
                            List<SpecDetail.Spec> specs = game.getSpecs().getMinimum().getSpec();
                            if (specs != null) {
                                for (SpecDetail.Spec spec : specs) {
                                    System.out.println(spec.getName() + ": " + spec.getValue());
                                }
                            }
                        }
                        this.gameRepository.save(game);
                        System.out.println("");
                    }
                    count++;
                }
                System.out.println("Added Source");

            }
        } catch (TransformerException e) {
            e.printStackTrace();
        } catch (JAXBException e) {
            e.printStackTrace();
        }

        return count;
    }

    private StreamSource getGamesData(WebEnum webEnum) throws TransformerException {
        GameCrawler crawler = new GameCrawler();

        return crawler.crawlingFromWeb(webEnum);
    }

}
