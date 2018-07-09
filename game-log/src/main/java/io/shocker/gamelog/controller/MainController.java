package io.shocker.gamelog.controller;

import io.shocker.gamelog.model.User;
import io.shocker.gamelog.service.AdministrationService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/main")
public class MainController {
    private final AdministrationService administrationService;

    public MainController(AdministrationService administrationService) {
        this.administrationService = administrationService;
    }

    @GetMapping(value = "")
    @ResponseBody
    public ModelAndView getMainPage(ModelAndView modelAndView, @RequestParam(value = "admin", required = false) String loadAdmin) {
        if (loadAdmin!=null) {
            modelAndView.setViewName("administrationTab.html");
        }else {
            modelAndView.setViewName("main.html");
        }
        return modelAndView;
    }

//    @GetMapping(value = "administration")
//    @ResponseBody
//    public ModelAndView getAdministrationTab(ModelAndView modelAndView) {
//
//        return modelAndView;
//    }

    @PostMapping(value = "/login")
    @ResponseBody
    public String login(@RequestParam(value = "username") String username,
                        @RequestParam(value = "password") String password) {
        User user = administrationService.login(username, password);
        if (user != null) {
            return user.getUsername();
        }
        return null;
    }
}
