package io.shocker.gamelog.service;

import io.shocker.gamelog.config.WebEnum;
import io.shocker.gamelog.model.*;

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
        private int gameCrawled = 0;
        private final GameService gameService;

        public GameCrawlingThread(GameService gameService) {
            this.gameService = gameService;
        }

        @Override
        public void run() {
            try {

                WebEnum webEnum = WebEnum.Game;
                System.out.println("Firing: "+Thread.currentThread().getName());
                for (int i = 0; i < 20; i++) {

                    if (Thread.currentThread().isInterrupted()) {
                        System.out.println("Stopped thread: "+Thread.currentThread().getName()+", item added: "+gameCrawled);
                        break;
                    }

                    webEnum.setUrl("https://store.steampowered.com/search/?sort_by=Released_DESC&page=" + i);
                    System.out.println(webEnum.getUrl());
                    StreamSource streamResult =
                            gameService.getGamesData(webEnum);

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

            } catch (TransformerException e) {
                e.printStackTrace();
            } catch (JAXBException e) {
                e.printStackTrace();
            }
            System.out.println("Finish Crawling Game");
        }

        public int getGameCrawled() {
            return gameCrawled;
        }

    }

    public static class GearCrawlingThread extends Thread{
        private final GearService gearService;

        public GearCrawlingThread(GearService gearService) {
            this.gearService = gearService;
        }

        private int gearCrawled = 0;

        @Override
        public void run() {
            WebEnum webEnum = WebEnum.Gear;
            System.out.println("Firing: "+Thread.currentThread().getName());
            List<Categories.GearCategory> categories = this.gearService.gearCategoryRepository.findAll();
            if (categories != null) {
                for (Categories.GearCategory category : categories) {
                    if (Thread.currentThread().isInterrupted()){
                        System.out.println("Stopped thread: "+Thread.currentThread().getName()+", item added: "+gearCrawled);
                        break;
                    }
                    try {
                        webEnum.setUrl("https://fptshop.com.vn" + category.getHref());
                        StreamSource streamResult =
                                gearService.getGearsData(webEnum);
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
                        System.err.println("Error Transformer at page:"+ category.getHref());
                    } catch (JAXBException e) {
                        System.err.println("Error JAXB at page:"+ category.getHref());
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