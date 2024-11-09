// Fetching mock data from a JSON file
fetch('MOCK_DATAtest.json')
    .then(response => response.json())
    .then(data => {
        // Extracting and counting genders
        const genderCount = data.reduce((acc, item) => {
            if (acc[item.gender]) {
                acc[item.gender]++;
            } else {
                acc[item.gender] = 1;
            }
            return acc;
        }, {});
        
        // Preparing labels and values for Chart.js
        const labels = Object.keys(genderCount);
        const values = Object.values(genderCount);

        // Creating a chart with Chart.js
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar', // Change to 'line', 'pie', etc. as needed
            data: {
                labels: labels,
                datasets: [{
                    label: 'Gender Count',
                    data: values,
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
