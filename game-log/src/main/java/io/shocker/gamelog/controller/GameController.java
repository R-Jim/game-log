package io.shocker.gamelog.controller;

import io.shocker.gamelog.config.SpecEnum;
import io.shocker.gamelog.model.Categories;
import io.shocker.gamelog.model.Games;
import io.shocker.gamelog.model.Spec;
import io.shocker.gamelog.service.GameService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@Controller
@RequestMapping(value = "/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping(value = "/main")
    @ResponseBody
    public ModelAndView getMainPage(ModelAndView modelAndView) {
        modelAndView.setViewName("main.html");
        return modelAndView;
    }

    @GetMapping(value = {""}, produces = MediaType.APPLICATION_XML_VALUE)
    @ResponseBody
    public Games getGameList(@RequestParam(value = "currentPage", required = false) Integer currentPage
            , @RequestParam(value = "categoryId", required = false) String categoryId) {
        Integer parsedCategoryId = null;
        try {
            parsedCategoryId = Integer.parseInt(categoryId);
        } catch (NumberFormatException ex) {
        }
        Games games = this.gameService.getAllGames(currentPage, parsedCategoryId);
        return games;
    }


    @GetMapping(value = {"/spec"})
    @ResponseBody
    public List<Spec> getGameSpec(@RequestParam(value = "id") Integer gameId) {
        return this.gameService.getGameSpec(gameId);
    }

    @GetMapping(value = "/load")
    @ResponseBody
    public void loadGames() {
        this.gameService.crawlGame();
    }

    @GetMapping(value = "/category", produces = MediaType.APPLICATION_XML_VALUE)
    @ResponseBody
    public Categories getAll() {
        Categories categories = this.gameService.getAllCategories();
        return categories;
    }

    @GetMapping(value = "/category/load")
    @ResponseBody
    public void loadGameCategories() {
        this.gameService.crawlGameCategory();
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
