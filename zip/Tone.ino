

void singleTone(int note, int duration,unsigned int rest,int light_mode){


  unsigned char octave=(note>11)?5:4;  
  unsigned char divisor=_freq[note];

#ifdef __AVR_ATtiny85__
  if(divisor!=0){
    TCCR1 = 0x90 | (8-octave); // for 1MHz clock
    // TCCR1 = 0x90 | (11-octave); // for 8MHz clock
    OCR1C = divisor-1;         // set the OCR
  }
#else
    Serial.println(divisor);    
#endif

  int num=(int)(duration*_step/_blink);
  int br=duration*_step-num*_blink;
  
  //light_mode=8;
 
  switch(light_mode){
    case 1:
      digitalWrite(LED_PIN[0],HIGH);
      break;
    case 2:    
      digitalWrite(LED_PIN[1],HIGH);
      break;
    case 4:
      digitalWrite(LED_PIN[2],HIGH);
      break;


    case 3:
      digitalWrite(LED_PIN[0],HIGH);
      digitalWrite(LED_PIN[1],HIGH);
      break;
   case 6:
      digitalWrite(LED_PIN[1],HIGH);
      digitalWrite(LED_PIN[2],HIGH);
      break;
   case 5:
      digitalWrite(LED_PIN[0],HIGH);
      digitalWrite(LED_PIN[2],HIGH);
      break;
   
    
    case 7:
      digitalWrite(LED_PIN[0],HIGH);
      digitalWrite(LED_PIN[1],HIGH);
      digitalWrite(LED_PIN[2],HIGH);
      break;
    case 8:
      for(int i=0;i<num;++i){      
        if(i%2==0){
          digitalWrite(LED_PIN[0],LOW);
          digitalWrite(LED_PIN[1],LOW);
          digitalWrite(LED_PIN[2],LOW);
        }else{
          digitalWrite(LED_PIN[0],HIGH);
          digitalWrite(LED_PIN[1],HIGH);
          digitalWrite(LED_PIN[2],HIGH);
        }
        delay(_blink);
      }
      delay(br);
      break;
  }

    if(light_mode!=8) delay(duration*_step);
    
    digitalWrite(LED_PIN[0],LOW);
    digitalWrite(LED_PIN[1],LOW);
    digitalWrite(LED_PIN[2],LOW);
  
  
#ifdef __AVR_ATtiny85__
  if(divisor!=0)
      TCCR1 = 0x90;              // stop the counter
#endif
  
  delay(rest);
  
}

void playSong(){

    int len=_song_len/2;
    for(int i=0;i<len;++i){
      singleTone(int(_song[i]&0xF0)/16,int(_due[i]&0xF0)/16,_rest,int(_light[i]&0xF0)/16);      
      singleTone(int(_song[i]&0x0F),int(_due[i]&0x0F),_rest,int(_light[i]&0x0F));      
    } 
   
    delay(100);

   
}

