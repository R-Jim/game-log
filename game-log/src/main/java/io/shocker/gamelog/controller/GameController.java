package io.shocker.gamelog.controller;

import io.shocker.gamelog.model.Categories;
import io.shocker.gamelog.model.Games;
import io.shocker.gamelog.service.GameService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;



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
            , @RequestParam(value = "categoryId", required = false) Integer categoryId) {
        System.out.println(currentPage+","+categoryId);
        Games games = this.gameService.getAllGames(currentPage, categoryId);
        return games;
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
}
