
#include <Arduino.h>
int BPM;
int lastBPM;
int threshold = 10;
int baseline = 0;
int maxStress = 0;
int minStress = 999;
int compteur = 0;
// tout ce qui est avant le loop est sur l'ide et les chaines de caractères a afficher sur la console
void setup()
{

  pinMode(A0, INPUT);
  Serial.begin(9600);
  Serial.print("begin\n");

  // Calibration
  Serial.println("veuillez posez votre main sur la souris la phase de calibrage va commencer... S'il vous plaît, détendez-vous");
  delay(5000);
  /*
  //int heartRate = analogRead(A0);
   // SBPM = map(heartRate, 400, 1023, 30, 200);
  int SBPM = analogRead(A0);
    BPM = (SBPM / 10);
   if (BPM == lastBPM) {
    compteur++;
  }
  else {

    compteur = 0;
  }
  if (compteur >= 4) {
    Serial.println("veuillez posez votre main sur la souris la phase de calibrage va recommencer.. S'il vous plaît, détendez-vous");
    BPM = 0;
  }
     delay(5000);*/

  for (int i = 0; i < 10; i++)
  {

    int BPM = (analogRead(A0)) / 10;

    /*
      if (BPM == lastBPM) {
     compteur++;
   }
   else {
     compteur = 0;
   }
   if (compteur >= 4) {
     Serial.println("Valeur nulle");
     BPM = 0;
     baseline=0;
     Serial.println("veuillez posez votre main sur la souris");

   }
   else {
    // Serial.print("Valeur : ");
     //Serial.println(BPM);
 //baseline += BPM;}  */
    baseline += BPM;
    delay(500);
    // lastBPM=BPM;
    // baseline += BPM;
  }
  baseline = baseline / 10;
  maxStress = baseline + 10;
  minStress = baseline - 10;
/*
  Serial.print("Calibration done. Baseline BPM: ");
  Serial.print(baseline);
  Serial.print(", Max stress BPM: ");
  Serial.print(maxStress);
  Serial.print(", Min stress BPM: ");
  Serial.println(minStress);*/
}
void loop()
{
  int BPM = (analogRead(A0) / 10);

  Serial.println("BPM avant comparaison evec maxstress:");
  Serial.println(BPM);

  if (BPM > maxStress && BPM != 51 && BPM != 52)
  {
    Serial.println("Stress");
    Serial.println(BPM);
    delay(2000);
  }
  else
  {
    Serial.println("No stress");
    Serial.println(0);
    delay(2000);
  }
}
