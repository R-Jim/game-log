package io.shocker.gamelog.service;

import io.shocker.gamelog.config.SpecEnum;
import io.shocker.gamelog.config.WebEnum;
import io.shocker.gamelog.crawler.BasicCrawler;
import io.shocker.gamelog.crawler.GameCrawler;
import io.shocker.gamelog.crawler.GearCrawler;
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
import java.util.Collections;
import java.util.List;

@Service
public class GearService {
    private static final org.apache.logging.log4j.Logger logger = LogManager.getLogger(GameService.class);

    public final GearCategoryRepository gearCategoryRepository;
    public final GearRepository gearRepository;
    public final GearHasCategoryRepository gearHasCategoryRepository;

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
        } catch (TransformerException | JAXBException e) {
            logger.log(Level.WARN, e);
        }

        return count;
    }

    private StreamSource getGearCategoryData() throws TransformerException {
        BasicCrawler crawler = new BasicCrawler();

        return crawler.crawlingFromWeb(WebEnum.GearCategory);
    }


    public String crawlGear(String name) {
        ThreadService.GearCrawlingThread gameCrawlingThread = new ThreadService.GearCrawlingThread(this);
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
                ThreadService.GearCrawlingThread gearCrawlingThread = (ThreadService.GearCrawlingThread) t;
                return gearCrawlingThread.getGearCrawled();
            }
        }
        return -1;
    }

    public StreamSource getGearsData(WebEnum webEnum) throws TransformerException {
        GearCrawler crawler = new GearCrawler();

        return crawler.crawlingFromWeb(webEnum);
    }


    public Gears getAllGears(String nameLike, Integer currentPage, Integer categoryId) {
        Gears gears = new Gears();
        if (currentPage == null) {
            currentPage = 1;
        }
        int offset = 10 * (currentPage - 1);

        String name = "%";
        if (nameLike != null) {
            name = "%" + nameLike + "%";
        }

        String cateId = "%";
        if (categoryId != null) {
            cateId = String.valueOf(categoryId);
        }
        System.out.println(offset + "," + cateId);
        gears.setGear(this.gearRepository.getAllGears(name, 10, offset, cateId));
        return gears;
    }

    public Gears.Gear getGearDetail(Integer gearId) {
        return this.gearRepository.getById(gearId);
    }


    public List<String> getSpecTypeData(int type) {
        List<String> specList = null;
        switch (type) {
            case SpecEnum.OS:
                specList = this.gearRepository.getOsType();
                break;
            case SpecEnum.Ram:
                specList = this.gearRepository.getRamType();
                break;
            case SpecEnum.CPU:
                specList = this.gearRepository.getProcessorType();
                break;
            case SpecEnum.GPU:
                specList = this.gearRepository.getGraphicType();
                break;
        }
        if (specList != null) {
            specList.removeAll(Collections.singleton(null));
        }
        return specList;
    }
}
