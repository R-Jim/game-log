package io.shocker.gamelog.controller;

import io.shocker.gamelog.model.GameCategories;
import io.shocker.gamelog.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.ResponseEntity.status;

@Controller
@RequestMapping(value = "/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping(value = "")
    @ResponseBody
    public ModelAndView getMainPage(ModelAndView modelAndView) {
        modelAndView.setViewName("main.html");
        return modelAndView;
    }

    @GetMapping(value = "/categories")
    @ResponseBody
    public ResponseEntity<List<GameCategories.GameCategory>> getAll() {
        List<GameCategories.GameCategory> domains = this.gameService.getAllCategories();
        return !domains.isEmpty() ? status(OK).body(domains)
                : status(NO_CONTENT).build();
    }

    @GetMapping(value = "/categories/load")
    @ResponseBody
    public void loadGameCategories() {
        this.gameService.crawlGameCategory();
    }

}
