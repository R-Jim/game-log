package io.shocker.gamelog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GameLogApplication {

	public static void main(String[] args) {
		SpringApplication.run(GameLogApplication.class, args);
	}
}
