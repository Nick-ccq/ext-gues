
//% color="#AA278D" iconWidth=50 iconHeight=40
namespace DFRobot_Gesture_Touch{
    //手势软串口初始化积木
    //% board="arduino"
    //% block="DFRobot_Gesture_Touch init [SSR] pin RX [RX] TX [TX] " blockType="command"
    //% SSR.shadow="dropdown" SSR.options="SSR" 
    //% RX.shadow="dropdown" RX.options="RX" 
    //% TX.shadow="dropdown" TX.options="TX" 
   
    export function Gesture_TouchInitSsr(parameter: any, block: any) {
        let ssr=parameter.SSR.code;
        let rx=parameter.RX.code;
        let tx=parameter.TX.code;
        //ID不能一样，否则出现相同，代码无法正常显示
        Generator.addInclude("Gesture_TouchInitIncludeDFRobot_Gesture_Touch", "#include <DFRobot_Gesture_Touch.h>");
        Generator.addInclude("Gesture_TouchInitIncludeSoftwareSerial", "#include <SoftwareSerial.h>");

       

       // Generator.addSetup(`Gesture_TouchInitSetupmySerial${ssr}`, `${ssr}.begin(9600);`);


        if (Generator.board=="arduino") {
            Generator.addObject(`Gesture_TouchInitObjectSoftwareSerial${ssr}`, `SoftwareSerial`, ` ${ssr}(${rx}, ${tx});`);
            Generator.addObject(`Gesture_TouchInitObjectDFRobot_Gesture_Touch`, `DFRobot_Gesture_Touch`, `DFGT(&${ssr});`);
    
    
            Generator.addObject(`Gesture_TouchInitObjectDFRobot_Gesture_Touchrslt`, "int8_t",`Gesture_TouchInitSsr_rslt=0;`);
    
            Generator.addSetup("Gesture_TouchInitSetupDFGT", `DFGT.setGestureDistance(20);`);

            
            Generator.addSetup(`Gesture_TouchInitSetupmySerial${ssr}`, `${ssr}.begin(9600);`);
            
        } else if(Generator.board=="esp32"){
             Generator.addSetup(`Gesture_TouchInitSetupmySerial${ssr}`, `${ssr}.begin(&${ssr});`);

        }else if(Generator.board=="microbit"){
            Generator.addObject(`Gesture_TouchInitObjectSoftwareSerial${ssr}`, `SoftwareSerial`, ` ${ssr}(${rx}, ${tx});`);
            Generator.addObject(`Gesture_TouchInitObjectDFRobot_Gesture_Touch`, `DFRobot_Gesture_Touch`, `DFGT(&${ssr});`);
    
    
            Generator.addObject(`Gesture_TouchInitObjectDFRobot_Gesture_Touchrslt`, "int8_t",`Gesture_TouchInitSsr_rslt=0;`);
    
             Generator.addSetup("Gesture_TouchInitSetupDFGT", `DFGT.setGestureDistance(20);`);
            
            Generator.addSetup(`Gesture_TouchInitSetupmySerial${ssr}`, `${ssr}.begin(9600);`);
       }
        

    
    }
    //% board="esp32,microbit"
    //手势硬串口初始化积木
    //% block="DFRobot_Gesture_TouchSR init [SR] pin RX [SRX] TX [STX]" blockType="command"
    //% SR.shadow="dropdown"  SR.options="SR" 
    //% SRX.shadow="dropdown" SRX.options="SRX" 
    //% STX.shadow="dropdown" STX.options="STX" 
    
    export function Gesture_TouchInitSr(parameter: any, block: any) {
        let sr=parameter.SR.code;
        let srx=parameter.SRX.code;
        let stx=parameter.STX.code;
        //ID不能一样，否则出现相同，代码无法正常显示
        Generator.addInclude("Gesture_TouchInitIncludeDFRobot_Gesture_Touch", "#include <DFRobot_Gesture_Touch.h>");

        
        //主控板区分
        if (Generator.board=="arduino") {
            Generator.addSetup(`Gesture_TouchInitSetupmySerial${sr}`, `${sr}.begin(9600);`);
            
        } else if(Generator.board=="esp32"){
            Generator.addObject(`Gesture_TouchInitObjectDFRobot_Gesture_Touch`, `DFRobot_Gesture_Touch`, `DFGT(&${sr});`);
            Generator.addSetup(`Gesture_TouchInitSetupmySerial${sr}`, `${sr}.begin(9600,${srx},${stx});`);

         }
         else if(Generator.board=="microbit"){
            Generator.addObject(`Gesture_TouchInitObjectDFRobot_Gesture_Touch`, `DFRobot_Gesture_Touch`, `DFGT(&${sr});`);

            Generator.addSetup(`Gesture_TouchInitSetupmySerial${sr}`, `${sr}.begin(${srx},${stx});`);
         }


        
        Generator.addObject(`Gesture_TouchInitObjectDFRobot_Gesture_Touchrslt`,  "int8_t",`Gesture_TouchInitSsr_rslt=0;`);

        Generator.addSetup("Gesture_TouchInitSetupDFGT", `DFGT.setGestureDistance(20);`);

        

    
    } 
    //手势设置模式积木
    //% block="DFRobot_Gesture_Touch [AB] Gesture [CD]" blockType="command"
    //% AB.shadow="dropdown"  AB.options="AB"  //AB代表使能和关闭
    //% CD.shadow="dropdown"  CD.options="CD"  //CD代表手势模式
   
    export function Gesture_TouchInitABCD(parameter: any, block: any) {
        let ab=parameter.AB.code;
        let cd=parameter.CD.code;
        
        Generator.addSetup(`Gesture_TouchInitSetupGesture_TouchInitABCD${ab}${cd}`, `DFGT.${ab}(${cd});`);
        


    }

    //休眠积木
    //% block="DFRobot_Gesture_Touch set Sleep [SLEEP]" blockType="command"
    //% SLEEP.shadow="number"  SLEEP.defl="10"
     
    export function Gesture_TouchInitSleep(parameter: any, block: any) {
        let sleep=parameter.SLEEP.code;
        

        Generator.addSetup("Gesture_TouchInitSetupGesture_TouchInitSleep", `DFGT.setSleep(${sleep});`);


    }
    //手势设置距离积木
    //% block="DFRobot_Gesture_Touch set distence [DST]" blockType="command"
    //% DST.shadow="number"  DST.defl="10"
    export function Gesture_TouchInitDST(parameter: any, block: any) {
        let dst = parameter.DST.code;
       Generator.addSetup("Gesture_TouchInitSetupDFGT",`DFGT.setGestureDistance(${dst});`,true);



    }

   
    //手势读数据积木
    //% block="DFRobot_Gesture_Touch read" blockType="command"
    export function Gesture_TouchInitRead(parameter: any, block: any) {
        Generator.addCode("Gesture_TouchInitSsr_rslt=DFGT.getAnEvent();");


    }
    //手势数据？积木
    //% block="DFRobot_Gesture_Touch [RSLT]" blockType="boolean"
    //% RSLT.shadow="dropdown"  RSLT.options="RSLT"
    export function Gesture_TouchInitRead1(parameter: any, block: any) {
        let rslt = parameter.RSLT.code;
       Generator.addCode([`Gesture_TouchInitSsr_rslt==${rslt}`, Generator.ORDER_UNARY_POSTFIX]);


    }
    
    
    
    
}
