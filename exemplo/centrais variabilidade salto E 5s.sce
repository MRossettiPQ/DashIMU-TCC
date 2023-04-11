// ###########################################################################
// Variáveis do sinal
//perna: grafico 2
//pitch=preto=flexão + e extensão -
//yaw=vermelho=inclinação lateral E+ D-
//roll=azul não tem
//
//pé: gráfico 1
//pitch=preto=Inversão + e eversão -
//yaw=vermelho=plantiflexão - dorsi +
//roll=azul não tem
//
//
//taxa = 120 Hz
// ######################################################################################################################//
// ######################################## TRATAMENTO DO ARQUIVO *.DAT ################################################//
// ######################################################################################################################//

// ###################################### ABERTURA DO ARQUIVO ################################################//

clear;
ind=1;

//caixa de diálogo pra colocar o peso do sujeito
//pesosujeito=x_dialog(['peso';'entre com o peso do sujeito fora da água em Mv'],'850')
//pesofora=eval(pesosujeito);

Flag=1; //condição de retornar ao inicio depois do fim do programa
while Flag==1 then
  Flag=0; //condição de terminar

  // NOmeando as colunas
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



//
//////
//xset('window',1)
//plot(tempo,roll1)
//plot(tempo,pitch1,'black')
//plot(tempo,yaw1,'r')
//xtitle('','Tempo (s) roll (azul) pitch (preto) yaw (verm) ','graus')
//xgrid ()
////
//
//xset('window',2)
//plot(tempo,roll2)
//plot(tempo,pitch2,'black')
//plot(tempo,yaw2,'r')
//xtitle('','Tempo (s) roll (azul) pitch (preto) yaw (verm) ','graus')
//xgrid ()
//
//xset('window',11)
//plot(tempo,x1)
//plot(tempo,y1,'black')
//plot(tempo,z1,'r')
//xtitle('','Tempo (s) x (azul) y (preto) z (verm) ','g')
//xgrid ()


//
//
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



//se quiser alterar o valor da janela está para três segundos
iniciof=inicioi-135;

xset('window',1)
plot(tempo,pitch1p,'green')
plot(tempo(inicio),pitch1p(inicio),'p')
plot(tempo(iniciof),pitch1p(iniciof),'p')
xtitle('','Tempo (s) roll (azul) pitch (verde) yaw (verm) ','graus')
xgrid ()
//

xset('window',2)
plot(tempo,atorn,'black')
plot(tempo(inicio),atorn(inicio),'p')
plot(tempo(iniciof),atorn(iniciof),'p')



//
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



//tempos
tvv(ind,1)=minpitch;
tvv(ind,2)=maxpitch;
tvv(ind,3)=varpitch;
tvv(ind,4)=minatorn;
tvv(ind,5)=maxatorn;
tvv(ind,6)=varatorn;
tvv(ind,7)=meanrmsratorn;
tvv(ind,8)=sdrmsratorn;
tvv(ind,9)=meanrmsrpitch1p;
tvv(ind,10)=sdrmsrpitch1p;
valor=tvv;


clear zerarroll1 roll1p roll1 zerarroll2 roll2p roll2 zerarpitch1 pitch1p pitch1;
clear zerarpitch2 pitch2p pitch2 zeraryaw1 yaw1p yaw1 zeraryaw2 yaw2p yaw2;
clear zerarx1 x1p x1 zerary1 y1p y1 zerarz1 z1p z1 atorn;
clear recyaw1p irecyaw1p rpitch1p ratorn zatorn;
clear limit9 y1p inicio iniciof inicioi;


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxcortar as curvas para mostrar os dadosxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxcortar as curvas para mostrar os dadosxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx




  //ESCOLHA : TRATAR OUTRO ARQUIVO OU SAIR DO PROGRAMA
  //############################################################

  //Rq : O BOTÃO N 2 (e NAO O  n°1) É APRESENTADO COMO ESCLHA principal (NEGRITO)
  Choix=x_message("Você deseja tratar outro arquivo.txt ?",["NÃO","SIM"]);
    if Choix==2 then
       Flag=1; //VAI PARA O INICIO
       xbasc(1)
              xbasc(2)
        ind=ind+1;
       else //Flag reste = 0 donc on sortira de la boucle générale
    end
end //FIM


rep=tk_getdir();
Nom='variáveis salto esquerdo';
Fichier=string(rep)+"/"+string(Nom)+".txt";
fprintfMat(Fichier,valor,'%3.3f\t')


