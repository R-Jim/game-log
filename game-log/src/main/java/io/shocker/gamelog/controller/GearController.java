package io.shocker.gamelog.controller;

import io.shocker.gamelog.model.Categories;
import io.shocker.gamelog.service.GameService;
import io.shocker.gamelog.service.GearService;
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
@RequestMapping(value = "/gear")
public class GearController {

    private final GearService gearService;

    public GearController(GearService gearService) {
        this.gearService = gearService;
    }

    @GetMapping(value = "")
    @ResponseBody
    public ModelAndView getMainPage(ModelAndView modelAndView) {
        modelAndView.setViewName("main.html");
        return modelAndView;
    }

    @GetMapping(value = "/load")
    @ResponseBody
    public void loadGames() {
        this.gearService.crawlGear();
    }

    @GetMapping(value = "/categories")
    @ResponseBody
    public ResponseEntity<List<Categories.GearCategory>> getAll() {
        List<Categories.GearCategory> domains = this.gearService.getAllCategories();
        return !domains.isEmpty() ? status(OK).body(domains)
                : status(NO_CONTENT).build();
    }

    @GetMapping(value = "/categories/load")
    @ResponseBody
    public void loadGameCategories() {
        this.gearService.crawlGearCategory();
    }
}