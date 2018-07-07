package io.shocker.gamelog.service;

import io.shocker.gamelog.config.WebEnum;
import io.shocker.gamelog.model.Game;
import io.shocker.gamelog.model.Games;

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
                System.out.println("Finding Source");
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
        }

        public int getGameCrawled() {
            return gameCrawled;
        }

    }
}
