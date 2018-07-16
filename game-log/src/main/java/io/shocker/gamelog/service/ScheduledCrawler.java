package io.shocker.gamelog.service;

import io.shocker.gamelog.config.GamaProperties;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
public class ScheduledCrawler {

    private static final Logger log = LogManager.getLogger(ScheduledCrawler.class);
    private final GamaProperties gamaProperties;
    private final GameService gameService;
    private final GearService gearService;

    public ScheduledCrawler(GamaProperties gamaProperties, GameService gameService, GearService gearService) {
        this.gamaProperties = gamaProperties;
        this.gameService = gameService;
        this.gearService = gearService;
    }

    @Scheduled(fixedRateString = "${gama.timedScheduleCrawler}", initialDelayString = "${gama.timedScheduleCrawler}")
    public void reportCurrentTime() {
        log.info("SERVER :: Automatic crawling process firing");
        log.info("Start Automatic Category crawling");
        this.gameService.crawlGameCategory();
        this.gearService.crawlGearCategory();
        log.info("Start Automatic Game crawling");
        this.gameService.crawlGame("gameCrawler");
        log.info("Start Automatic Gear crawling");
        this.gearService.crawlGear("gearCrawler");
        log.info("SERVER :: Automatic crawling process finish");
    }
}
