package io.shocker.gamelog.service;

import io.shocker.gamelog.config.WebEnum;
import io.shocker.gamelog.crawler.BasicCrawler;
import io.shocker.gamelog.model.GameCategories;
import io.shocker.gamelog.repository.GameCategoryRepository;
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

    public GameService(GameCategoryRepository gameCategoryRepository) {
        this.gameCategoryRepository = gameCategoryRepository;
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
                    if (existed != null){
                        category.setId(existed.getId());
                    }
                    this.addCategory(category);
                    count++;
                }
                System.out.println("Added Source");

            }
        } catch (TransformerException e) {
            e.printStackTrace();
        }
        catch (JAXBException e) {
            e.printStackTrace();
        }

        return count;
    }

    private StreamSource getGamesCategoryData() throws TransformerException {
        BasicCrawler crawler = new BasicCrawler();

        StreamSource result = crawler.crawlingFromWeb(WebEnum.GameCategory);
        return result;

    }

}
