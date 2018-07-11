package io.shocker.gamelog.service;

import io.shocker.gamelog.config.SpecEnum;
import io.shocker.gamelog.crawler.BasicCrawler;
import io.shocker.gamelog.crawler.GameCrawler;
import io.shocker.gamelog.model.*;
import io.shocker.gamelog.repository.*;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.TransformerException;
import javax.xml.transform.stream.StreamSource;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class GameService {
    private static final org.apache.logging.log4j.Logger logger = LogManager.getLogger(GameService.class);

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

    public Categories getAllCategories() {
        Categories categories = new Categories();
        categories.setCategory(Categories.gameToCategoryList(this.gameCategoryRepository.findAll()));
        return categories;
    }

    public Categories.GameCategory addCategory(Categories.GameCategory gameCategory) {
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

                Categories gameCategory = (Categories) unmarshaller.unmarshal(streamResult.getInputStream());
                List<Categories.Category> list = gameCategory.getCategory();
                for (Categories.Category category : list) {
                    Categories.GameCategory existed = this.gameCategoryRepository.findByValue(category.getValue());
                    if (existed != null) {
                        category.setId(existed.getId());
                    }
                    this.addCategory(category.toGameCategory());
                    count++;
                }
                System.out.println("Added Source");

            }
        } catch (TransformerException | JAXBException e) {
            logger.log(Level.WARN, e);
        }

        return count;
    }

    private StreamSource getGamesCategoryData() throws TransformerException {
        BasicCrawler crawler = new BasicCrawler();
        WebEntityService webEntityService = new WebEntityService();
        WebEntity.Web webEntity = webEntityService.getWebEntity("gameCategory");
        return crawler.crawlingFromWeb(webEntity);
    }


    public String crawlGame(String name) {
        ThreadService.GameCrawlingThread gameCrawlingThread = new ThreadService.GameCrawlingThread(this);
        boolean existed;
        do {
            existed = false;
            for (Thread t : Thread.getAllStackTraces().keySet()) {
                if (t.getName().equals(name)) {
                    name += "1";
                    existed = true;
                    break;
                }
            }
        } while (existed);
        gameCrawlingThread.setName(name);
        gameCrawlingThread.start();
        return name;
    }

    public int crawlingStatus(String name, boolean neededToStop) {
        for (Thread t : Thread.getAllStackTraces().keySet()) {
            if (t.getName().equals(name)) {
                if (neededToStop) {
                    t.interrupt();
                }
                ThreadService.GameCrawlingThread gameCrawlingThread = (ThreadService.GameCrawlingThread) t;
                return gameCrawlingThread.getGameCrawled();
            }
        }
        return -1;
    }

    public StreamSource getGamesData(WebEntity.Web webEntity) throws TransformerException {
        GameCrawler crawler = new GameCrawler();

        return crawler.crawlingFromWeb(webEntity);
    }

    public void setUpGameData(Game game) {

        if (game.getId() != null) {
            System.out.println(game.getId() + "=" + "," + game.getName());


            this.gameRepository.save(game);

            //Set up specs
            if (game.getMinimum() != null) {
                List<SpecDetail.Spec> specs = game.getMinimum().getSpec();
                if (specs != null) {
                    Spec specDetail = this.specRepository.findByGameIdAndMinimum(game.getId(), true);
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
                    Spec specDetail = this.specRepository.findByGameIdAndMinimum(game.getId(), false);
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
                Categories.GameCategory gameCategory = this.gameCategoryRepository.findByValue(tag);
                if (gameCategory != null) {
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
            }
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
            logger.log(Level.WARN, e);
        }
    }

    public Games getAllGames(String nameLike, Integer currentPage, Integer categoryId) {
        Games games = new Games();
        if (currentPage == null) {
            currentPage = 1;
        }
        int offset = 10 * (currentPage - 1);
        String cateId = "%";
        if (categoryId != null) {
            cateId = String.valueOf(categoryId);
        }
        String name = "%";
        if (nameLike != null) {
            name = "%" + nameLike + "%";
        }
        List<Game> gameList = this.gameRepository.getAllGames(name, 10, offset, cateId);
        for (Game game : gameList) {
            //Get all tags
            List<GameHasTag> tagList = this.gameHasTagRepository.findAllByGameId(game.getId());
            List<String> tagNames = new ArrayList<>();
            for (GameHasTag tag : tagList) {
                Tag tagEntity = this.tagRepository.getById(tag.getTagId());
                tagNames.add(tagEntity.getName());
            }

            Game.Tags tags = new Game.Tags();
            tags.setTag(tagNames);
            game.setTags(tags);
        }
        games.setGame(gameList);
        return games;
    }


    public List<String> getSpecTypeData(int type) {
        List<String> specList = null;
        switch (type) {
            case SpecEnum.OS:
                specList = this.specRepository.getOsType();
                break;
            case SpecEnum.Ram:
                specList = this.specRepository.getRamType();
                break;
            case SpecEnum.CPU:
                specList = this.specRepository.getProcessorType();
                break;
            case SpecEnum.GPU:
                specList = this.specRepository.getGraphicType();
                break;
        }
        if (specList != null) {
            specList.removeAll(Collections.singleton(null));
        }
        return specList;
    }

    public List<Spec> getGameSpec(Integer gameId) {
        List<Spec> specs = new ArrayList<>();
        Spec gameSpec = this.specRepository.findByGameIdAndMinimum(gameId, true);
        if (gameSpec != null) {
            specs.add(gameSpec);
        }
        gameSpec = this.specRepository.findByGameIdAndMinimum(gameId, false);
        if (gameSpec != null) {
            specs.add(gameSpec);
        }
        return specs;
    }
}
