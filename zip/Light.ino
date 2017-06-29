void setAllLight(bool on_){
    if(on_){
        digitalWrite(LED_PIN[0],HIGH);
        digitalWrite(LED_PIN[1],HIGH);
        digitalWrite(LED_PIN[2],HIGH);
    }else{
        digitalWrite(LED_PIN[0],LOW);
        digitalWrite(LED_PIN[1],LOW);
        digitalWrite(LED_PIN[2],LOW);
    }
    
} 
void setSingleLight(){
  digitalWrite(LED_PIN[_wait_index],HIGH);
  delay(WAIT_STEP);
  digitalWrite(LED_PIN[_wait_index],LOW);
  _wait_index=(_wait_index+1)%3;
}

