document.addEventListener('DOMContentLoaded', function() {
    fetch('Data/page_views.json')
        .then(response => response.json())
        .then(data => {
            // Predefined array of month names in order
            const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            
            // Extracting necessary information for the chart and transforming timestamps to months
            const monthDurationMap = data.reduce((acc, item) => {
                const date = new Date(item.timestamp);
                const month = date.toLocaleString('default', { month: 'long' });

                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += item.duration;
                return acc;
            }, {});

            // Preparing labels and values for Chart.js
            const labels = monthOrder.filter(month => monthDurationMap[month] !== undefined);
            const durations = labels.map(month => monthDurationMap[month]);

            // Creating a chart with Chart.js
            const ctx = document.getElementById('myChart2').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Page View Duration by Month',
                        data: durations,
                        backgroundColor: 'rgba(0, 123, 255, 0.5)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error loading data:', error));
});
