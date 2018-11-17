var grafico=function(tagId,produtos,valores,cores){
      new Chart(
        document.getElementById(tagId),
        {
        type: 'bar',
        data: {
          labels: produtos,
          datasets: [
            {
              backgroundColor: cores,
              data: valores
            }
          ]
        },
        options: {
          legend: { display: false }
        }
      });
   
  };