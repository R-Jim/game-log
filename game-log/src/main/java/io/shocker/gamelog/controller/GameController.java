package io.shocker.gamelog.controller;

import io.shocker.gamelog.config.SpecEnum;
import io.shocker.gamelog.model.Categories;
import io.shocker.gamelog.model.Games;
import io.shocker.gamelog.model.Spec;
import io.shocker.gamelog.service.GameService;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping(value = "/game")
public class GameController {
    private static final Logger logger = LogManager.getLogger(GameController.class);

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping(value = {""}, produces = MediaType.APPLICATION_XML_VALUE)
    @ResponseBody
    public Games getGameList(@RequestParam(value = "currentPage", required = false) Integer currentPage
            , @RequestParam(value = "categoryId", required = false) String categoryId) {
        Integer parsedCategoryId = null;
        try {
            parsedCategoryId = Integer.parseInt(categoryId);
        } catch (NumberFormatException ex) {
            logger.log(Level.WARN, "NumberFormatException: getGameList\n" + ex);
        }
        return this.gameService.getAllGames(currentPage, parsedCategoryId);
    }


    @GetMapping(value = {"/spec"})
    @ResponseBody
    public List<Spec> getGameSpec(@RequestParam(value = "id") Integer gameId) {
        return this.gameService.getGameSpec(gameId);
    }

    @GetMapping(value = "/load")
    @ResponseBody
    public String loadGames() {
        return this.gameService.crawlGame("gameCrawler");
    }

    @GetMapping(value = "/stop")
    @ResponseBody
    public int stopThread(@RequestParam(value = "name") String threadName) {
        return this.gameService.crawlingStatus(threadName, true);
    }

    @GetMapping(value = "/status")
    @ResponseBody
    public int threadStatus(@RequestParam(value = "name") String threadName) {
        return this.gameService.crawlingStatus(threadName, false);
    }

    @GetMapping(value = "/category", produces = MediaType.APPLICATION_XML_VALUE)
    @ResponseBody
    public Categories getAll() {
        Categories categories = this.gameService.getAllCategories();
        return categories;
    }

    @GetMapping(value = "/category/load")
    @ResponseBody
    public int loadGameCategories() {
        return this.gameService.crawlGameCategory();
    }

    @GetMapping(value = "/type/os")
    @ResponseBody
    public List<String> loadGameOsType() {
        return this.gameService.getSpecTypeData(SpecEnum.OS);
    }


    @GetMapping(value = "/type/ram")
    @ResponseBody
    public List<String> loadGameRamType() {
        return this.gameService.getSpecTypeData(SpecEnum.Ram);
    }


    @GetMapping(value = "/type/cpu")
    @ResponseBody
    public List<String> loadGameCpuType() {
        return this.gameService.getSpecTypeData(SpecEnum.CPU);
    }


    @GetMapping(value = "/type/gpu")
    @ResponseBody
    public List<String> loadGameGpuType() {
        return this.gameService.getSpecTypeData(SpecEnum.GPU);
    }

}
