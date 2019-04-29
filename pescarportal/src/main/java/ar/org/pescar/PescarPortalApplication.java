package ar.org.pescar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PescarPortalApplication {

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(PescarPortalApplication.class, args);

//        System.out.println("+++++ Beans provided when Spring Boot starts +++++");
//
//        String[] beanNames = ctx.getBeanDefinitionNames();
//        Arrays.sort(beanNames);
//        for (String beanName : beanNames) {
//            System.out.println(beanName);
//        }
    }

}

