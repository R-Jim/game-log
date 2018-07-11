package io.shocker.gamelog.controller;

import io.shocker.gamelog.model.User;
import io.shocker.gamelog.service.AdministrationService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.UUID;

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
        if (loadAdmin != null) {
            modelAndView.setViewName("administrationTab.html");
        } else {
            modelAndView.setViewName("main.html");
        }
        return modelAndView;
    }

    @PostMapping(value = "/login")
    @ResponseBody
    public String login(@RequestParam(value = "username") String username,
                        @RequestParam(value = "password") String password, HttpSession httpSession,
                        @RequestParam(value = "uniqueID", required = false) String uniqueID) {
        if (httpSession.getAttribute(uniqueID) != null) {
            return uniqueID;
        }
        User user = administrationService.login(username, password);
        if (user != null) {
            String newUniqueID = UUID.randomUUID().toString();
            httpSession.setAttribute(newUniqueID, user);
            return newUniqueID;
        }
        return null;
    }

    @PostMapping(value = "/logout")
    @ResponseBody
    public void login(HttpSession httpSession,
                      @RequestParam(value = "uniqueID") String uniqueID) {
        if (httpSession.getAttribute(uniqueID) != null) {
            httpSession.removeAttribute(uniqueID);
        }
    }
}
