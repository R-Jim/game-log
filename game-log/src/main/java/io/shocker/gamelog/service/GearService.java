package io.shocker.gamelog.service;

import io.shocker.gamelog.config.WebEnum;
import io.shocker.gamelog.crawler.BasicCrawler;
import io.shocker.gamelog.crawler.GameCrawler;
import io.shocker.gamelog.crawler.GearCrawler;
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
public class GearService {

    private final GearCategoryRepository gearCategoryRepository;
    private final GearRepository gearRepository;
    private final GearHasCategoryRepository gearHasCategoryRepository;

    public GearService(GearCategoryRepository gearCategoryRepository, GearRepository gearRepository, GearHasCategoryRepository gearHasCategoryRepository) {
        this.gearCategoryRepository = gearCategoryRepository;
        this.gearRepository = gearRepository;
        this.gearHasCategoryRepository = gearHasCategoryRepository;
    }

    public Categories getAllCategories() {
        Categories categories = new Categories();
        categories.setCategory(Categories.gearToCategoryList(this.gearCategoryRepository.findAll()));
        return categories;
    }

    public Categories.GearCategory addCategory(Categories.GearCategory gearCategory) {
        return this.gearCategoryRepository.save(gearCategory);
    }

    public int crawlGearCategory() {
        int count = 0;

        try {
            StreamSource streamResult =
                    getGearCategoryData();
            System.out.println("Found Source");
            if (streamResult != null) {

                JAXBContext jaxbContext = JAXBContext.newInstance("io.shocker.gamelog.model");
                Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

                Categories gameCategory = (Categories) unmarshaller.unmarshal(streamResult.getInputStream());
                List<Categories.Category> list = gameCategory.getCategory();
                for (Categories.Category category : list) {
                    Categories.GearCategory existed = this.gearCategoryRepository.findByValue(category.getValue());
                    if (existed != null) {
                        category.setId(existed.getId());
                    }
                    this.addCategory(category.toGearCategory());
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

    private StreamSource getGearCategoryData() throws TransformerException {
        BasicCrawler crawler = new BasicCrawler();

        return crawler.crawlingFromWeb(WebEnum.GearCategory);
    }


    public int crawlGear() {
        int count = 0;

        WebEnum webEnum = WebEnum.Gear;
        System.out.println("Finding Gear Source");
        List<Categories.GearCategory> categories = this.gearCategoryRepository.findAll();
        if (categories != null) {
            for (Categories.GearCategory category : categories) {
                try {
                    webEnum.setUrl("https://fptshop.com.vn" + category.getHref());
                    StreamSource streamResult =
                            getGearsData(webEnum);
                    System.out.println("Found Source");
                    if (streamResult != null) {

                        JAXBContext jaxbContext = JAXBContext.newInstance("io.shocker.gamelog.model");
                        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

                        Gears gears = (Gears) unmarshaller.unmarshal(streamResult.getInputStream());
                        List<Gears.Gear> list = gears.getGear();
                        for (Gears.Gear gear : list) {
                            Gears.Gear existed = this.gearRepository.findByName(gear.getName());
                            if (existed != null) {
                                gear.setId(existed.getId());
                            }
                            gear.setUpSpec();
                            this.gearRepository.save(gear);
                            GearHasCategory gearHasCategory = new GearHasCategory();
                            gearHasCategory.setGearId(gear.getId());
                            gearHasCategory.setCategoryId(category.getId());
                            this.gearHasCategoryRepository.save(gearHasCategory);
                            count++;
                        }
                        System.out.println("Added Source");
                    }
                } catch (TransformerException e) {
                    System.err.println("Error Transformer at page:"+ category.getHref());
                } catch (JAXBException e) {
                    System.err.println("Error JAXB at page:"+ category.getHref());
                }
            }
        }
        System.out.println("Finish Crawling Gear");
        return count;
    }

    private StreamSource getGearsData(WebEnum webEnum) throws TransformerException {
        GearCrawler crawler = new GearCrawler();

        return crawler.crawlingFromWeb(webEnum);
    }


    public Gears getAllGears(Integer currentPage, Integer categoryId) {
        Gears gears = new Gears();
        if (currentPage==null){
            currentPage = 1;
        }
        int offset = 10 * (currentPage - 1);
        String cateId = "%";
        if (categoryId!=null){
            cateId = String.valueOf(categoryId);
        }
        System.out.println(offset+","+cateId);
        gears.setGear(this.gearRepository.getAllGears(10,offset,cateId));
        return gears;
    }
}
