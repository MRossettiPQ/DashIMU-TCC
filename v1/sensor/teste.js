// TODO Conhecendo as funções em Javascript a seguir
function getMean(array) {
    console.log('[SCILAB] Mean Function')
    return math.mean(array)
}

function getMax(array) {
    console.log('[SCILAB] Max Function')
    return math.max(array)
}

function getMin(array) {
    console.log('[SCILAB] Min Function')
    return math.min(array)
}

function getIndexMinMax(array, value) {
    console.log('[SCILAB] Index Function')
    return array.indexOf(value)
}

function getSqrt(value) {
    console.log('[SCILAB] Sqrt Function')
    return math.sqrt(value)
}

function getColumn(array, column) {
    console.log('[SCILAB] Get Column')
    return array.map((obj) => obj[`${column}`])
}

function getArraySubtract(array, subtractValue) {
    console.log('[SCILAB] Array Subtract')
    return array.map((obj) => math.subtract(obj, subtractValue))
}

function getArrayDivision(array, divisorValue) {
    console.log('[SCILAB] Array Division')
    return array.map((obj) => math.divide(obj, divisorValue))
}

function getArrayPow(array, pow) {
    console.log('[SCILAB] Array Pow')
    return array.map((obj) => math.pow(obj, pow))
}

function getArraySqrt(array) {
    console.log('[SCILAB] Array Sqrt')
    return array.map((obj) => math.sqrt(obj))
}

function getStDeviation(array) {
    console.log('[SCILAB] Standard Deviation')
    return math.std(array)
}

// Sabendo que uma medição tem o formato da interface a seguir
export interface GyroMeasurement {
    id?: number;
    sensorName?: string;
    numberMensuration?: number;
    hourMensuration?: string;
    Acc_X?: number | null;
    Acc_Y?: number | null;
    Acc_Z?: number | null;
    AccelX_mss?: number | null;
    AccelY_mss?: number | null;
    AccelZ_mss?: number | null;
    Gyr_X?: number | null;
    Gyr_Y?: number | null;
    Gyr_Z?: number | null;
    Mag_X?: number | null;
    Mag_Y?: number | null;
    Mag_Z?: number | null;
    Roll?: number | null;
    Pitch?: number | null;
    Yaw?: number | null;
    Euler_X?: number | null;
    Euler_Y?: number | null;
    Euler_Z?: number | null;
    Quaternion_X?: number | null;
    Quaternion_Y?: number | null;
    Quaternion_Z?: number | null;
    Quaternion_W?: number | null;
  }

  // Essa interface é a representação de uma linha do arquivo csv e conhecendo o cabeçalho do arquivo em csv, a seguir.
  // Counter	Acc_X	Acc_Y	Acc_Z	Gyr_X	Gyr_Y	Gyr_Z	Mag_X	Mag_Y	Mag_Z	Roll	Pitch	Yaw	Latitude	Longitude	Altitude	Vel_X	Vel_Y	Vel_Z

  // Conveter para javascript o codigo do SciLab a seguir em uma a função recebe measurements_1 e measurements_2 ao inves de um arquivo
  /*

[Data,text]=fscanfMat('C:\TCC\Exemplo\DJ E 05-000.TXT');   
  l=size(Data,1);
  roll1=Data(:,10);
  pitch1=Data(:,11);
  yaw1=Data(:,12);
  yaw1=yaw1*(-1);
  x1=Data(:,2);
  y1=Data(:,3);
  z1=Data(:,4);
  clear Data;
  
  [Data2,text2]=fscanfMat('C:\TCC\Exemplo\SL E 02-000.TXT');   
  l2=size(Data2,1);
  roll2=Data2(:,10);
  pitch2=Data2(:,11);
  yaw2=Data2(:,12);
  clear Data2;
  
  fl=l/120;
  tempo=0:0.0083333:fl;
  tempo=tempo(1:l);
  
  // ###################################### FIM - DA ABERTURA DO ARQUIVO A TRATAR ##########################################//
  
  // ######################################### FY ###################################################//
  
  zerarroll1=mean(roll1(10:100));
  roll1p=roll1-(zerarroll1);
  
  zerarroll2=mean(roll2(10:100));
  roll2p=roll2-(zerarroll2);
  
  zerarpitch1=mean(pitch1(10:100));
  pitch1p=pitch1-(zerarpitch1);
  
  zerarpitch2=mean(pitch2(10:100));
  pitch2p=pitch2-(zerarpitch2);
  
  zeraryaw1=mean(yaw1(10:100));
  yaw1p=yaw1-(zeraryaw1);
  
  zeraryaw2=mean(yaw2(10:100));
  yaw2p=yaw2-(zeraryaw2);
  
  
  zerarx1=mean(x1(10:100));
  x1p=x1-(zerarx1);
  
  zerary1=mean(y1(10:100));
  y1p=y1-(zerary1);
  
  zerarz1=mean(z1(10:100));
  z1p=z1-(zerarz1);
  
  
  for i=1:l
    atorn(i)=90-(yaw1(i))-(pitch2(i));
  end
  
  ////peegar os valores que interessam
  ////peegar os valores que interessam
  limit9=max(y1p);
  
  yy1p=y1p/2;
  yy1p=yy1p^4;
  
  //encontrar o valor do inicio
  for i=1:length(yy1p);
    if yy1p(i)>limit9 then
     inicioi=i;
     break
  end
  end
  inicio=inicioi-735;
  iniciof=inicioi-135;
  
  //recortar
  rpitch1p=pitch1p(inicio:iniciof);
  ratorn=atorn(inicio:iniciof);
  
  [minpitch iminpitch]=min(rpitch1p);
  [maxpitch imaxpitch]=max(rpitch1p);
  varpitch=maxpitch-minpitch;
  
  [minatorn iminatorn]=min(ratorn);
  [maxatorn imaxatorn]=max(ratorn);
  varatorn=maxatorn-minatorn;
  
  zatorn=ratorn-90;
  rmsratorn=sqrt(zatorn^2);
  rmsrpitch1p=sqrt(rpitch1p^2);
  
  meanrmsratorn=mean(rmsratorn);
  sdrmsratorn=st_deviation(rmsratorn);
  
  meanrmsrpitch1p=mean(rmsrpitch1p);
  sdrmsrpitch1p=st_deviation(rmsrpitch1p);

  */