package me.niallmurray.slipstreamf1.web;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/sse")
public class SseController {

  private Map<String, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

  @GetMapping("/eventEmitter")
  public SseEmitter eventEmitter() throws IOException {
    SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
    UUID guid = UUID.randomUUID();
    sseEmitters.put(guid.toString(), sseEmitter);
    sseEmitter.send(SseEmitter.event().name("GUI_ID").data(guid));
    sseEmitter.onCompletion(() -> sseEmitters.remove(guid.toString()));
    sseEmitter.onTimeout(() -> sseEmitters.remove(guid.toString()));
    return sseEmitter;
  }

  @GetMapping("/test-pick-made")
  public SseEmitter testPickMade(Long userId, String surname) throws IOException {
    SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
    if (userId != null) {
      sseEmitter.send(surname);
//      String message = SseEmitter.event().name("driverName").data(surname).toString();
//      sseEmitter.send(SseEmitter.event().name("driverName").data(surname));
//      System.out.println(message);
      System.out.println("driver name: " + surname);
    }
    sseEmitter.complete();
    return sseEmitter;
  }

  @GetMapping("/pick-made")
  public SseEmitter pickMade(Long userId) throws IOException {
//  public SseEmitter pickMade() throws IOException {
//    if (userId != null) {
    SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
//    String key = "SSE Test " + Math.random();
    String key = String.valueOf(userId);
    sseEmitters.put(key, sseEmitter);
//    sseEmitter.send(SseEmitter.event().name("pick_made").data("test"));
    sseEmitter.send(SseEmitter.event().name("pick_made").data(key));
    sseEmitter.onCompletion(() -> sseEmitters.remove(key));
    sseEmitter.onTimeout(() -> sseEmitters.remove(key));
//    System.out.println("sseEmitter user ID: " + key);
    return sseEmitter;
//    }
//    return null;
  }

//  @GetMapping("/sse-endpoint-address")
//  public SseEmitter pickMade(Long userId) throws IOException {
//
//
//  }

  private static final Logger LOGGER = LoggerFactory.getLogger(SseController.class);
  private final ExecutorService executor = Executors.newSingleThreadExecutor();

  @PostConstruct
  public void init() {
    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      executor.shutdown();
      try {
        executor.awaitTermination(1, TimeUnit.SECONDS);
      } catch (InterruptedException e) {
        LOGGER.error(e.toString());
      }
    }));
  }

  //  @GetMapping("/time")
  @GetMapping("/pick-made-test")
//  @CrossOrigin
//  public SseEmitter streamDateTime(Long userId) throws IOException {
  public SseEmitter pickMadeTest(Long userId) throws IOException {

    SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);

    sseEmitter.onCompletion(() -> LOGGER.info("SseEmitter is completed"));

    sseEmitter.onTimeout(() -> LOGGER.info("SseEmitter is timed out"));

    sseEmitter.onError((ex) -> LOGGER.info("SseEmitter got error:", ex));

//    executor.execute(() -> {
//      for (int i = 0; i < 15; i++) {
//        try {
//          sseEmitter.send(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss")));
//          if (userId != null) {
//            sseEmitter.send(userId.toString());
//            System.out.println("sseEmitter user ID: " + userId.toString());
//          }
//          sleep(1, sseEmitter);
//        } catch (IOException e) {
//          e.printStackTrace();
//          sseEmitter.completeWithError(e);
//        }
//      }
//      sseEmitter.complete();
//    });
    if (userId != null) {
      sseEmitter.send(userId.toString());
      System.out.println("sseEmitter user ID: " + userId.toString());
    }

    LOGGER.info("Controller exits");
    return sseEmitter;
  }

  private void sleep(int seconds, SseEmitter sseEmitter) {
    try {
      Thread.sleep(seconds * 1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
      sseEmitter.completeWithError(e);
    }
  }
}


