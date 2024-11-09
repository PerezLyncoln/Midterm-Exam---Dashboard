document.addEventListener('DOMContentLoaded', function() {
    fetch('Data/earnings2.json')  // Adjust the path to your mock data file if necessary
        .then(response => response.json())
        .then(data => {
            // Aggregate earnings by month
            const monthEarningsMap = data.reduce((acc, item) => {
                const date = new Date(item.date);
                const month = date.toLocaleString('default', { month: 'long' });

                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += item.earnings;
                return acc;
            }, {});

            // Predefined array of month names in order
            const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            // Prepare labels and earnings based on the month order
            const labels = monthOrder.filter(month => monthEarningsMap[month] !== undefined);
            const earnings = labels.map(month => monthEarningsMap[month]);

            // Creating a chart with Chart.js
            const ctx = document.getElementById('earningsChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Monthly Earnings (₱)',
                        data: earnings,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₱' + value;  // Add PHP sign to y-axis labels
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.raw !== null) {
                                        label += '₱' + context.raw;  // Add PHP sign to tooltip
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error loading data:', error));
});
