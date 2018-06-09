package io.shocker.gamelog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/game")
public class GameController {

    @GetMapping(value = "")
    @ResponseBody
    public ModelAndView getMainPage(ModelAndView modelAndView) {
        modelAndView.setViewName("main.html");
        return modelAndView;
    }

}
