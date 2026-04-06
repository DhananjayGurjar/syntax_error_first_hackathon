/* ============================================================
   Chronic Pain Correlator — script.js
   ============================================================ */

// ── Slider update helpers ──────────────────────────────────
function updateSleep(val) {
  document.getElementById('sleep-display').textContent = val + 'h';
  const pct = (val / 12) * 100;
  const el = document.getElementById('sleep-range');
  el.style.background = `linear-gradient(to right, var(--teal) 0%, var(--teal) ${pct}%, #2a3340 ${pct}%)`;
}

function updateStress(val) {
  document.getElementById('stress-display').textContent = val + '/10';
  const pct = (val / 10) * 100;
  const el = document.getElementById('stress-range');
  el.style.background = `linear-gradient(to right, var(--yellow) 0%, var(--yellow) ${pct}%, #2a3340 ${pct}%)`;
}

function updatePain(val) {
  document.getElementById('pain-display').textContent = val + '/10';
  const pct = (val / 10) * 100;
  const el = document.getElementById('pain-range');
  el.style.background = `linear-gradient(to right, var(--yellow) 0%, var(--yellow) ${pct}%, #2a3340 ${pct}%)`;
}

// ── Chart.js global defaults ───────────────────────────────
Chart.defaults.color = '#8b949e';
Chart.defaults.borderColor = '#21262d';
Chart.defaults.font.family = "'Segoe UI', system-ui, sans-serif";
Chart.defaults.font.size = 11;

// ── Sleep vs Pain Trend Chart ──────────────────────────────
const trendCtx = document.getElementById('trendChart').getContext('2d');

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const sleepData = [8, 7, 6.5, 7.5, 6, 9, 8.5];
const painData  = [4, 5, 8, 6, 7, 3, 4];

new Chart(trendCtx, {
  type: 'line',
  data: {
    labels: days,
    datasets: [
      {
        label: 'Sleep Hours',
        data: sleepData,
        borderColor: '#2dd4bf',
        backgroundColor: 'rgba(45,212,191,0.08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#2dd4bf',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Pain Level',
        data: painData,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#ef4444',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          color: '#8b949e',
          font: { size: 11 }
        }
      },
      tooltip: {
        backgroundColor: '#1c2330',
        borderColor: '#21262d',
        borderWidth: 1,
        padding: 10,
        titleColor: '#e6edf3',
        bodyColor: '#8b949e',
      }
    },
    scales: {
      x: {
        grid: { color: '#1e2530' },
        ticks: { color: '#8b949e' }
      },
      y: {
        type: 'linear',
        position: 'left',
        min: 0, max: 12,
        grid: { color: '#1e2530' },
        ticks: { color: '#8b949e', stepSize: 3 },
        title: { display: true, text: 'Sleep (h)', color: '#6e7681', font: { size: 10 } }
      },
      y1: {
        type: 'linear',
        position: 'right',
        min: 0, max: 10,
        grid: { drawOnChartArea: false },
        ticks: { color: '#8b949e', stepSize: 2 },
        title: { display: true, text: 'Pain', color: '#6e7681', font: { size: 10 } }
      }
    }
  }
});

// ── Sleep vs Pain Scatter Chart ────────────────────────────
const sleepScatterCtx = document.getElementById('sleepScatterChart').getContext('2d');
new Chart(sleepScatterCtx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Sleep vs Pain',
      data: [
        {x: 5, y: 8}, {x: 6, y: 7}, {x: 6.5, y: 6},
        {x: 7, y: 5}, {x: 7.5, y: 4}, {x: 8, y: 3}, {x: 9, y: 2}
      ],
      backgroundColor: '#2dd4bf',
      pointRadius: 6,
      pointHoverRadius: 8,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 6, yMax: 6,
            borderColor: '#ef4444',
            borderWidth: 1.5,
            borderDash: [5, 5],
          }
        }
      }
    },
    scales: {
      x: {
        min: 0, max: 12,
        grid: { color: '#1e2530' },
        ticks: { color: '#8b949e', stepSize: 3 },
        title: { display: true, text: 'Sleep (h)', color: '#6e7681', font: { size: 10 } }
      },
      y: {
        min: 0, max: 10,
        grid: { color: '#1e2530' },
        ticks: { color: '#8b949e', stepSize: 3 },
        title: { display: true, text: 'Pain', color: '#6e7681', font: { size: 10 } }
      }
    }
  }
});

// ── Stress vs Pain Scatter Chart ───────────────────────────
const stressScatterCtx = document.getElementById('stressScatterChart').getContext('2d');
new Chart(stressScatterCtx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Stress vs Pain',
      data: [
        {x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 3.5},
        {x: 4, y: 4}, {x: 5, y: 5}, {x: 6, y: 6},
        {x: 7, y: 7.5}, {x: 8, y: 8.5}, {x: 9, y: 9}
      ],
      backgroundColor: '#f59e0b',
      pointRadius: 6,
      pointHoverRadius: 8,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        min: 0, max: 10,
        grid: { color: '#1e2530' },
        ticks: { color: '#8b949e', stepSize: 3 },
        title: { display: true, text: 'Stress', color: '#6e7681', font: { size: 10 } }
      },
      y: {
        min: 0, max: 10,
        grid: { color: '#1e2530' },
        ticks: { color: '#8b949e', stepSize: 3 },
        title: { display: true, text: 'Pain', color: '#6e7681', font: { size: 10 } }
      }
    }
  }
});

// ── Log Today's Entry button feedback ─────────────────────
document.querySelector('.log-btn').addEventListener('click', () => {
  const btn = document.querySelector('.log-btn');
  btn.textContent = '✅ Entry Logged!';
  btn.style.background = '#166534';
  btn.style.color = '#2dd4bf';
  setTimeout(() => {
    btn.textContent = "Log Today's Entry";
    btn.style.background = '';
    btn.style.color = '';
  }, 2000);
});
