package in.ajinkya.app.controller;

import org.springframework.web.bind.annotation.RequestMapping;

@org.springframework.web.bind.annotation.RestController

public class HomeController {

 @RequestMapping("/api/hello")

 public String greet() {

  return "Hello from the other side!!!";

 }

}