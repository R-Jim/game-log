package io.shocker.gamelog.service;

import io.shocker.gamelog.model.*;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.TransformerException;
import javax.xml.transform.stream.StreamSource;
import java.util.List;

public class ThreadService extends Thread {
    private final GameService gameService;

    public ThreadService(GameService gameService) {
        this.gameService = gameService;
    }

    public void run() {
        System.out.println("Running: " + Thread.currentThread().getName());
        try {
//            gameService.crawlGame();
        } catch (Exception e) {
            System.out.println("Thread stopped: " + Thread.currentThread().getName());
            return;
        }
    }

    public static class GameCrawlingThread extends Thread {
        private static final org.apache.logging.log4j.Logger logger = LogManager.getLogger(GameService.class);

        private int gameCrawled = 0;
        private final GameService gameService;

        public GameCrawlingThread(GameService gameService) {
            this.gameService = gameService;
        }

        @Override
        public void run() {
            try {
                WebEntityService webEnumService = new WebEntityService();
                WebEntity.Web webEntity = webEnumService.getWebEntity("game");
                System.out.println("Firing: "+Thread.currentThread().getName());
                String baseUrl = webEntity.getUrl();
                for (int i = 0; i < 40; i++) {

                    if (Thread.currentThread().isInterrupted()) {
                        System.out.println("Stopped thread: "+Thread.currentThread().getName()+", item added: "+gameCrawled);
                        break;
                    }

                    webEntity.setUrl(baseUrl + i);
                    StreamSource streamResult =
                            gameService.getGamesData(webEntity);

                    if (Thread.currentThread().isInterrupted()) {
                        System.out.println("Stopped thread: "+Thread.currentThread().getName()+", item added: "+gameCrawled);
                        break;
                    }

                    System.out.println("Found Source");
                    if (streamResult != null) {

                        JAXBContext jaxbContext = JAXBContext.newInstance("io.shocker.gamelog.model");
                        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

                        Games games = (Games) unmarshaller.unmarshal(streamResult.getInputStream());

                        if (Thread.currentThread().isInterrupted()){
                            System.out.println("Stopped thread: "+Thread.currentThread().getName()+", item added: "+gameCrawled);
                            break;
                        }

                        List<Game> list = games.getGame();
                        for (Game game : list) {
                            if (Thread.currentThread().isInterrupted()){
                                System.out.println("Stopped thread: "+Thread.currentThread().getName()+", item added: "+gameCrawled);
                                break;
                            }

                            gameService.setUpGameData(game);
                            gameCrawled++;
                        }
                    }
                    System.out.println("");
                }
                System.out.println("Added Source");

            } catch (TransformerException |JAXBException e) {
                logger.log(Level.WARN,e);
            }
            System.out.println("Finish Crawling Game");
        }

        public int getGameCrawled() {
            return gameCrawled;
        }

    }

    public static class GearCrawlingThread extends Thread{
        private static final org.apache.logging.log4j.Logger logger = LogManager.getLogger(GameService.class);

        private final GearService gearService;

        public GearCrawlingThread(GearService gearService) {
            this.gearService = gearService;
        }

        private int gearCrawled = 0;

        @Override
        public void run() {
            WebEntityService webEntityService = new WebEntityService();
            WebEntity.Web webEntity = webEntityService.getWebEntity("gear");
            System.out.println("Firing: "+Thread.currentThread().getName());
            List<Categories.GearCategory> categories = this.gearService.gearCategoryRepository.findAll();
            if (categories != null) {
                String baseUrl = webEntity.getUrl();
                for (Categories.GearCategory category : categories) {
                    if (Thread.currentThread().isInterrupted()){
                        System.out.println("Stopped thread: "+Thread.currentThread().getName()+", item added: "+gearCrawled);
                        break;
                    }
                    try {
                        webEntity.setUrl(baseUrl + category.getHref());
                        StreamSource streamResult =
                                gearService.getGearsData(webEntity);
                        if (Thread.currentThread().isInterrupted()){
                            System.out.println("Stopped thread: "+Thread.currentThread().getName()+", item added: "+gearCrawled);
                            break;
                        }
                        System.out.println("Found Source");
                        if (streamResult != null) {

                            JAXBContext jaxbContext = JAXBContext.newInstance("io.shocker.gamelog.model");
                            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

                            Gears gears = (Gears) unmarshaller.unmarshal(streamResult.getInputStream());
                            if (Thread.currentThread().isInterrupted()){
                                System.out.println("Stopped thread: "+Thread.currentThread().getName()+", item added: "+gearCrawled);
                                break;
                            }
                            List<Gears.Gear> list = gears.getGear();
                            for (Gears.Gear gear : list) {
                                if (Thread.currentThread().isInterrupted()){
                                    System.out.println("Stopped thread: "+Thread.currentThread().getName()+", item added: "+gearCrawled);
                                    break;
                                }
                                Gears.Gear existed = this.gearService.gearRepository.findByName(gear.getName());
                                if (existed != null) {
                                    gear.setId(existed.getId());
                                }
                                if (Thread.currentThread().isInterrupted()){
                                    System.out.println("Stopped thread: "+Thread.currentThread().getName()+", item added: "+gearCrawled);
                                    break;
                                }
                                gear.setUpSpec();
                                this.gearService.gearRepository.save(gear);
                                GearHasCategory gearHasCategory = new GearHasCategory();
                                gearHasCategory.setGearId(gear.getId());
                                gearHasCategory.setCategoryId(category.getId());
                                this.gearService.gearHasCategoryRepository.save(gearHasCategory);
                                gearCrawled++;
                            }
                            System.out.println("Added Source");
                        }
                    } catch (TransformerException e) {
                        logger.log(Level.WARN,e);
                    } catch (JAXBException e) {
                        logger.log(Level.WARN,e);
                    }
                }
            }
            System.out.println("Finish Crawling Gear");
        }

        public int getGearCrawled() {
            return gearCrawled;
        }
    }
}
