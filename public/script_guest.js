      // ==========================
      // Inisialisasi IndexedDB
      // ==========================
      const dbName = 'RSVPDatabase';
      const storeName = 'RSVPStore';

      let db;

      function initDB() {
        const request = indexedDB.open(dbName, 1);
        request.onupgradeneeded = function (event) {
          db = event.target.result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
          }
        };
        request.onsuccess = function (event) {
          db = event.target.result;
          loadData(); // Muat data setelah DB siap
        };
        request.onerror = function (event) {
          console.error('Error opening IndexedDB:', event.target.error);
        };
      }

      // ==========================
      // Load data dari IndexedDB
      // ==========================
      let guestList = [];
      const rowsPerPage = 5;
      let currentPage = 1;

      function loadData() {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = function () {
          guestList = request.result;
          renderTable();
          renderPagination();
        };
        request.onerror = function () {
          console.error('Error fetching data.');
        };
      }

      // ==========================
      // Render tabel data RSVP
      // ==========================
      function renderTable() {
        const tbody  = document.getElementById('guest-list');
        tbody.innerHTML = '';

        const startIdx  = (currentPage - 1) * rowsPerPage;
        const endIdx  = Math.min(startIdx  + rowsPerPage, guestList.length);

        for (let i = startIdx; i < endIdx; i++) {
          const guest = guestList[i];
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${i + 1}</td>
            <td>${guest.name || '-'}</td>
            <td>${guest.address || '-'}</td>
            <td>${guest.phone || '-'}</td>
            <td>${guest.attending || '-'}</td>
            <td>${guest.guests !== undefined ? guest.guests : '-'}</td>
            <td>${guest.message || '-'}</td>
          `;
          tbody.appendChild(row);
        }
      }

      // ==========================
      // Render pagination
      // ==========================
      function renderPagination() {
        const paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = '';

        const totalPages = Math.ceil(guestList.length / rowsPerPage);
        if (totalPages <= 1) return; // Tidak perlu pagination jika cuma 1 halaman

        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.style.margin = '0 5px';
          btn.style.padding = '5px 10px';
          btn.style.cursor = 'pointer';

          if (i === currentPage) {
            btn.style.backgroundColor = '#007bff';
            btn.style.color = '#fff';
            btn.style.border = 'none';
            btn.style.borderRadius = '4px';
          }

          btn.addEventListener('click', () => {
            currentPage = i;
            renderTable();
            renderPagination();
          });

          paginationDiv.appendChild(btn);
        }
      }

      // ==========================
      // Event listener untuk modal
      // ==========================
      const modal = document.getElementById('rsvp-modal');
      const showModalBtn = document.getElementById('show-rsvp-form-btn');
      const closeModalBtn = document.getElementById('close-modal-btn');

      showModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
      });

      closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });

      // ==========================
      // Handle form submit
      // ==========================
      document.getElementById('rsvp-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const attending = document.getElementById('attending').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value.trim();

        const newRSVP = {
          name,
          address,
          phone,
          attending,
          guests: guests !== '' ? parseInt(guests) : 0,
          message,
        };

        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        store.add(newRSVP);

        transaction.oncomplete = () => {
          alert('RSVP added successfully!');
          document.getElementById('rsvp-form').reset();
          modal.style.display = 'none';
          loadData(); // Muat ulang data untuk update tabel
        };

        transaction.onerror = () => {
          console.error('Gagal menyimpan RSVP');
        };
      });

      // ==========================
      // Tampilkan/hide Guests input berdasarkan Attending
      // ==========================
      const attendingSelect = document.getElementById('attending');
      const guestsContainer = document.getElementById('guests-container');

// Fungsi toggleGuests harus ada dan dipanggil di onload
function toggleGuests() {
  if (document.getElementById('attending').value === 'Yes') {
    document.getElementById('guests-container').style.display = 'block';
  } else {
    document.getElementById('guests-container').style.display = 'none';
    document.getElementById('guests').value = '';
  }
}


    // Initialize on page load
    window.onload = () => {
      initDB();
      toggleGuests();
    };

    // ==========================
    // Download PDF
    // ==========================
    document.getElementById('download-pdf-btn').addEventListener('click', () => {
      if (guestList.length === 0) {
        alert('No data available to download.');
        return;
      }
      generatePDF(guestList);
    });

    async function generatePDF(data) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text('Guest List', 10, 10);

      const headers = ['#', 'Name', 'Address', 'Phone', 'Attending', 'Guests', 'Message'];
      let y = 20;
      doc.setFontSize(12);
      doc.text(headers.join(' | '), 10, y);

      data.forEach((guest, index) => {
        y += 10;
        const row = [
          index + 1,
          guest.name,
          guest.address,
          guest.phone,
          guest.attending,
          guest.guests !== undefined ? guest.guests : '-',
          guest.message || '-',
        ];
        doc.text(row.join(' | '), 10, y);
      });

      doc.save('guest_list.pdf');
    }
    // ==========================
    // End of script
    // ==========================
