
//#define N_C  239  00
//#define N_CS  225  01
//#define N_D  213  02
//#define N_DS 201  03
//#define N_E  190  04
//#define N_F  179  05
//#define N_FS 169  06
//#define N_G  159  07
//#define N_GS 150  08
//#define N_A  142  09
//#define N_AS 134  0A
//#define N_B  127  0B
//#define N_C5 239  0C
//#define BR   0    0D


#include "custom_song.h"

#define SPEAKER_PIN 1
#define SENSOR_PIN 0

#define MSONG 3

#define WAIT_STEP 3000
unsigned long SENSOR_DELAY = 2000;

int LED_PIN[] = {4, 3, 2};



int _song_order[] = {0, 1, 2};
int _song_index = 0;

unsigned char _freq[] = {239,  225,  213,  201,  
                         190,  179,  169,  159,  
                         150,  142,  134,  127,  
                         239,0
                        };

                        

int _sensor_stage = 0; // 0: null, 1: water, 2: dry, 3:sing

int _wait_index = 0;
bool _first = true;

int _rest = 10;
int _blink = 20;


void setup() {

  pinMode(SPEAKER_PIN, OUTPUT);
  pinMode(LED_PIN[0], OUTPUT);
  pinMode(LED_PIN[1], OUTPUT);
  pinMode(LED_PIN[2], OUTPUT);

  pinMode(SENSOR_PIN, INPUT);

#ifndef __AVR_ATtiny85__
  Serial.begin(9600);
#endif

  _sensor_stage = 0;

  //  _last_millis=millis();
  //  _sensed_time=0;
}

void loop() {

  //  if(_first){
  //    delay(3000);
  //    _first=false;
  //  }
  //
  //   playSong();
  //  _step=constrain(_step-20,80,240);
  //  _rest=_step/2;

  bool _high = (digitalRead(SENSOR_PIN) == HIGH);

  switch (_sensor_stage) {
    case 0: //null
      if (_high) {
        _sensor_stage = 1;
        setAllLight(false);
        return;
      } else {
        setAllLight(true);
      }
      break;
    case 1: //water
      if (!_high) {
        _sensor_stage = 2;
        setSingleLight();
        setAllLight(false);
        return;
      } else {
        setSingleLight();
      }
      break;
    case 2: //dry
      if (!_high) {
        _sensor_stage = 3;
      }
      break;
    case 3:
      playSong();

      //_step = constrain(_step - 20, 80, 240);
      //_rest = _step / 2;
      break;

  }




}






