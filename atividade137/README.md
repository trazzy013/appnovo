# Arduino UNO: luz, alertas e notas musicais

Três práticas de **Introdução à Internet das Coisas**, realizadas na ETEC de Praia Grande em 2026. Os experimentos mostram como o Arduino reage à luz e produz alertas visuais e sonoros, sem depender de conexão com a internet.

- [Práticas](#práticas)
- [Materiais](#materiais)
- [Como reproduzir](#como-reproduzir)
- [Como verificar](#como-verificar)
- [Créditos e licença](#créditos-e-licença)

## Práticas

| Relatório | Montagem | Resultado esperado |
| --- | --- | --- |
| 23 — LED com LDR (`Relatorio_Tecnico_Pratica_23_LDR_LED.pdf`) | LDR em A0, LED em D10 | Abaixo de 500, o LED acende. A partir de 500, apaga. |
| 24 — Alerta com LDR (`Relatorio_Tecnico_Pratica_24_LDR_LED_Buzzer.pdf`) | LDR em A0, LED em D10, buzzer em D6 | LED e buzzer ligam juntos abaixo de 500 e desligam a partir desse valor. |
| 25 — Notas musicais com buzzer (`Relatorio_Tecnico_Pratica_25_Buzzer_Notas.pdf`) | Buzzer em D10 | Emite um tom de 400 Hz, toca uma escala de Dó a Si e simula uma sirene de 400 a 1000 Hz e de volta a 400 Hz. |

Nas práticas 23 e 24, o código usa `analogRead()` para ler a tensão do divisor formado pelo LDR e um resistor. Depois compara a leitura com o limiar e controla as saídas com `digitalWrite()`. Na prática 25, `tone()` gera frequências e `noTone()` interrompe o som. Os três PDFs, fornecidos no arquivo `files.zip` da atividade, incluem a figura da montagem e o código-fonte de cada prática.

## Materiais

- Arduino UNO, cabo USB, protoboard, jumpers e computador com Arduino IDE.
- Práticas 23 e 24: LDR, resistor de 10 kΩ, LED e resistor de 150 Ω em série com o LED.
- Práticas 24 e 25: buzzer de 5 V compatível com a montagem. Para a prática 25, use um buzzer passivo para reproduzir frequências distintas.

## Como reproduzir

1. Abra o PDF da prática e consulte o esquema nos anexos.
2. Com o Arduino desconectado, monte o circuito conforme o esquema. Confira os pinos, o GND e a polaridade do LED.
3. Conecte a placa por USB. Na Arduino IDE, selecione **Arduino Uno** e a porta correspondente.
4. Crie um sketch, copie o código-fonte do relatório e use **Verificar** antes de **Carregar**.
5. Nas práticas 23 e 24, abra o Monitor Serial em **9600 baud**. O programa envia uma leitura a cada 500 ms.

## Como verificar

- **Prática 23:** cubra e descubra o LDR. Compare o estado do LED com as leituras no Monitor Serial.
- **Prática 24:** repita o teste e confirme que o LED e o buzzer mudam de estado juntos.
- **Prática 25:** verifique o tom inicial com pausas, as sete notas (262, 294, 330, 349, 392, 440 e 494 Hz) e a subida e descida do tom da sirene.

Se a iluminação não fizer o circuito mudar de estado nas práticas 23 e 24, observe as leituras com o sensor coberto e descoberto. Ajuste `limite` para um valor entre elas. Se as notas da prática 25 soarem iguais, confira o tipo de buzzer e a conexão ao D10.

## Créditos e licença

**Autores dos relatórios:** Giulia Ferreira, Rafael Barbosa, André Belo e Gabriel Travasso.

**Referências usadas:** a prática 23 orientou o circuito de leitura e acionamento do LED; a 24, o alerta visual e sonoro; a 25, a explicação sobre frequências e notas. O README da Atividade 137 serviu como referência para a estrutura do documento.

Para contribuir, explique qual prática foi alterada e confira se o texto, o esquema e o código continuam coerentes. Os materiais fornecidos não indicam uma licença própria para os relatórios.


