package io.shocker.gamelog.service;

import io.shocker.gamelog.config.WebEnum;
import io.shocker.gamelog.crawler.BasicCrawler;
import io.shocker.gamelog.crawler.GameCrawler;
import io.shocker.gamelog.model.*;
import io.shocker.gamelog.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.TransformerException;
import javax.xml.transform.stream.StreamSource;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

@Service
public class GameService {
    private final GameCategoryRepository gameCategoryRepository;
    private final GameRepository gameRepository;
    private final TagRepository tagRepository;
    private final SpecRepository specRepository;
    private final GameHasTagRepository gameHasTagRepository;

    public GameService(GameCategoryRepository gameCategoryRepository, GameRepository gameRepository,
                       TagRepository tagRepository, SpecRepository specRepository, GameHasTagRepository gameHasTagRepository) {
        this.gameCategoryRepository = gameCategoryRepository;
        this.gameRepository = gameRepository;
        this.tagRepository = tagRepository;
        this.specRepository = specRepository;
        this.gameHasTagRepository = gameHasTagRepository;
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
            System.out.println("Finding Source");
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
                    SetUpGameData(game);
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

    private void SetUpGameData(Games.Game game){

        if (game.getId() != null) {
            System.out.print("|" + game.getId() + "=" + "," + game.getName() + " tag: ");


            this.gameRepository.save(game);

            //Set up specs
            System.out.println("");
            if (game.getMinimum() != null) {
                List<SpecDetail.Spec> specs = game.getMinimum().getSpec();
                if (specs != null) {
                    Spec specDetail = this.specRepository.findByGameIdAndMinimum(game.getId(),true);
                    for (SpecDetail.Spec spec : specs) {
                        if (specDetail == null) {
                            specDetail = new Spec();
                        }
                        SetUpSpecDetail(specDetail, spec);
                    }
                    if (specDetail != null) {
                        specDetail.setGameId(game.getId());
                        specDetail.setMinimum(true);
                        this.specRepository.save(specDetail);
                    }
                }
            }
            if (game.getRecommend() != null) {
                List<SpecDetail.Spec> specs = game.getRecommend().getSpec();
                if (specs != null) {
                    Spec specDetail = this.specRepository.findByGameIdAndMinimum(game.getId(),false);
                    for (SpecDetail.Spec spec : specs) {
                        if (specDetail == null) {
                            specDetail = new Spec();
                        }
                        SetUpSpecDetail(specDetail, spec);
                    }
                    if (specDetail != null) {
                        specDetail.setGameId(game.getId());
                        this.specRepository.save(specDetail);
                    }
                }
            }
            //Set up tags
            for (String tag : game.getTags().getTag()) {
                Tag existedTag = this.tagRepository.getByName(tag);
                if (existedTag == null) {
                    existedTag = new Tag();
                }
                existedTag.setName(tag);
                GameCategories.GameCategory gameCategory = this.gameCategoryRepository.findByName(tag);
                if (gameCategory!=null){
                    existedTag.setCategoryId(gameCategory.getId());
                }
                this.tagRepository.save(existedTag);

                GameHasTag gameHasTag = new GameHasTag();
                gameHasTag.setGameId(game.getId());
                gameHasTag.setTagId(existedTag.getId());
                this.gameHasTagRepository.save(gameHasTag);
            }
        }
    }

    private void SetUpSpecDetail(Spec specDetail, SpecDetail.Spec spec) {
        try {
            String methodName = "set" + StringUtils.capitalize(spec.getName().toLowerCase());
            Method method = specDetail.getClass().getMethod(methodName, new Class[]{spec.getValue().getClass()});
            if (method != null) {
                method.invoke(specDetail, spec.getValue());
                System.out.println(method.getName());
            }
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }
    }

}
