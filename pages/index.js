import { useEffect, useState } from "react";

export default function Home() {
  const [commissions, setCommissions] = useState([]);
  const [marketing, setMarketing] = useState([]);
  const [payments, setPayments] = useState([]);

  const [newPayment, setNewPayment] = useState({
    transaction_id: "",
    amount: "",
    payment_date: "",
  });

  const fetchCommissions = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/komisi");
      const data = await response.json();
      setCommissions(data);
    } catch (error) {
      console.error("Error fetching commission data:", error);
    }
  };

  const fetchMarketing = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/marketing");
      const data = await response.json();
      setMarketing(data);
    } catch (error) {
      console.error("Error fetching marketing data:", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/pembayaran");
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const handleChange = (e) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value });
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();

    if (
      !newPayment.transaction_id ||
      !newPayment.amount ||
      !newPayment.payment_date
    ) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5500/api/pembayaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPayment),
      });

      if (response.ok) {
        alert("Pembayaran berhasil ditambahkan!");
        setNewPayment({ transaction_id: "", amount: "", payment_date: "" });
        fetchPayments();
      } else {
        alert("Gagal menambahkan pembayaran!");
      }
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  useEffect(() => {
    fetchCommissions();
    fetchMarketing();
    fetchPayments();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-semibold text-center text-red-600">
          Komisi Marketing
        </h1>

        {/* TABEL MARKETING */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-2xl font-semibold text-black mb-2">
            Daftar Marketing
          </h2>
          <table className="min-w-full table-auto">
            <thead className="bg-orange-100">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-black">
                  ID Marketing
                </th>
                <th className="text-left p-3 text-sm font-medium text-black">
                  Nama Marketing
                </th>
              </tr>
            </thead>
            <tbody>
              {marketing.length > 0 ? (
                marketing.map((mkt, index) => (
                  <tr
                    key={index}
                    className="hover:bg-orange-50 border-b border-gray-200"
                  >
                    <td className="p-3 text-sm text-black">{mkt.id}</td>
                    <td className="p-3 text-sm text-black">{mkt.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center p-3 text-sm text-black"
                  >
                    Loading marketing data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TABEL KOMISI */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-8">
          <table className="min-w-full table-auto">
            <thead className="bg-orange-100">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-black">
                  Marketing
                </th>
                <th className="text-left p-3 text-sm font-medium text-black">
                  Nomor Transaksi
                </th>
                <th className="text-left p-3 text-sm font-medium text-black">
                  Tanggal Transaksi
                </th>
                <th className="text-left p-3 text-sm font-medium text-black">
                  Omzet
                </th>
                <th className="text-left p-3 text-sm font-medium text-black">
                  Komisi %
                </th>
                <th className="text-left p-3 text-sm font-medium text-black">
                  Komisi Nominal
                </th>
              </tr>
            </thead>
            <tbody>
              {commissions.length > 0 ? (
                commissions.map((commission, index) =>
                  Array.isArray(commission.transactions)
                    ? commission.transactions.map((transaction, idx) => (
                        <tr
                          key={`${index}-${idx}`}
                          className="hover:bg-orange-50 border-b border-gray-200"
                        >
                          {idx === 0 && (
                            <td
                              rowSpan={commission.transactions.length}
                              className="p-3 text-sm font-medium text-black bg-red-50"
                            >
                              {commission.marketing}
                            </td>
                          )}
                          <td className="p-3 text-sm text-black">
                            {transaction.transaction_number}
                          </td>
                          <td className="p-3 text-sm text-black">
                            {transaction.tanggal_transaksi}
                          </td>
                          <td className="p-3 text-sm text-black">
                            {transaction.omzet.toLocaleString()}
                          </td>
                          <td className="p-3 text-sm text-black">
                            {transaction.komisi_persen}%
                          </td>
                          <td className="p-3 text-sm text-black">
                            {transaction.komisi_nominal.toLocaleString()}
                          </td>
                        </tr>
                      ))
                    : null
                )
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-3 text-sm text-black"
                  >
                    Loading data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FORM TAMBAH PEMBAYARAN */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-black mb-6">
            Tambah Pembayaran
          </h2>
          <form onSubmit={handleAddPayment} className="space-y-6">
            <div>
              <input
                type="text"
                name="transaction_id"
                value={newPayment.transaction_id}
                onChange={handleChange}
                placeholder="Nomor Transaksi"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-black focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <input
                type="number"
                name="amount"
                value={newPayment.amount}
                onChange={handleChange}
                placeholder="Jumlah Pembayaran"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-black focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <input
                type="date"
                name="payment_date"
                value={newPayment.payment_date}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-black focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg shadow-md hover:bg-orange-700 focus:outline-none"
              >
                Tambahkan Pembayaran
              </button>
            </div>
          </form>
        </div>

        {/* TABEL PEMBAYARAN */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-2xl font-semibold text-black mb-6">
            Daftar Pembayaran
          </h2>
          <table className="min-w-full table-auto">
            <thead className="bg-orange-100">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-black">
                  Transaction ID
                </th>
                <th className="text-left p-3 text-sm font-medium text-black">
                  Amount
                </th>
                <th className="text-left p-3 text-sm font-medium text-black">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr key={index} className="hover:bg-orange-50">
                    <td className="p-3 text-sm text-black">
                      {payment.transaction_id}
                    </td>
                    <td className="p-3 text-sm text-black">
                      {payment.amount.toLocaleString()}
                    </td>
                    <td className="p-3 text-sm text-black">
                      {payment.payment_date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center p-3 text-sm text-black"
                  >
                    Loading payment data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
