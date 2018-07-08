package io.shocker.gamelog.controller;

import io.shocker.gamelog.config.SpecEnum;
import io.shocker.gamelog.model.Categories;
import io.shocker.gamelog.model.Gears;
import io.shocker.gamelog.service.GameService;
import io.shocker.gamelog.service.GearService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping(value = "/main")
    @ResponseBody
    public ModelAndView getMainPage(ModelAndView modelAndView) {
        modelAndView.setViewName("main.html");
        return modelAndView;
    }

    @GetMapping(value = {""}, produces = MediaType.APPLICATION_XML_VALUE)
    @ResponseBody
    public Gears getGameList(@RequestParam(value = "currentPage", required = false) Integer currentPage
            , @RequestParam(value = "categoryId", required = false) String categoryId) {
        Integer parsedCategoryId = null;
        try {
            parsedCategoryId = Integer.parseInt(categoryId);
        } catch (NumberFormatException ex) {}
        Gears gears = this.gearService.getAllGears(currentPage, parsedCategoryId);
        return gears;
    }

    @GetMapping(value = {"/spec"})
    @ResponseBody
    public Gears.Gear getGearDetail(@RequestParam(value = "id") Integer gearId) {
        return this.gearService.getGearDetail(gearId);
    }
//
//    @GetMapping(value = "/load")
//    @ResponseBody
//    public void loadGames() {
//        this.gearService.crawlGear();
//    }

    @GetMapping(value = "/load")
    @ResponseBody
    public String loadGames() {
        return this.gearService.crawlGear("gearCrawler");
    }

    @GetMapping(value = "/stop")
    @ResponseBody
    public int stopThread(@RequestParam(value = "name") String threadName) {
        return this.gearService.stopCrawling(threadName);
    }


    @GetMapping(value = "/category", produces = MediaType.APPLICATION_XML_VALUE)
    @ResponseBody
    public Categories getAll() {
        Categories categories = this.gearService.getAllCategories();
        return categories;
    }

    @GetMapping(value = "/category/load")
    @ResponseBody
    public void loadGameCategories() {
        this.gearService.crawlGearCategory();
    }


    @GetMapping(value = "/type/os")
    @ResponseBody
    public List<String> loadGameOsType() {
        return this.gearService.getSpecTypeData(SpecEnum.OS);
    }


    @GetMapping(value = "/type/ram")
    @ResponseBody
    public List<String> loadGameRamType() {
        return this.gearService.getSpecTypeData(SpecEnum.Ram);
    }


    @GetMapping(value = "/type/cpu")
    @ResponseBody
    public List<String> loadGameCpuType() {
        return this.gearService.getSpecTypeData(SpecEnum.CPU);
    }


    @GetMapping(value = "/type/gpu")
    @ResponseBody
    public List<String> loadGameGpuType() {
        return this.gearService.getSpecTypeData(SpecEnum.GPU);
    }
}
