import { useEffect, useState } from "react";
import api from "../service/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Transaction = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load user", { position: "bottom-right" }
      );
    }
  };

  const getHistory = async () => {
    try {
      const res = await api.get("/data/history");
      setTransactions(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load history", { position: "bottom-right" }
      );
    }
  };

  useEffect(() => {
    getUser();
    getHistory();
  }, []);

  const handleCredit = async () => {
    if (!amount) {
      return toast.error("Please enter amount", { position: "bottom-right" });
    }

    if (Number(amount) <= 0) {
      return toast.error("Amount must be greater than 0", { position: "bottom-right" });
    }

    try {
      const res = await api.post("/data/credit", {
        amount,
        description,
      });

      toast.success(res.data.message, { position: "bottom-right" });

      await getUser();
      await getHistory();

      setAmount("");
      setDescription("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Credit Failed", { position: "bottom-right" }
      );
    }
  };

  const handleDebit = async () => {
    if (!amount) {
      return toast.error("Please enter amount", { position: "bottom-right" });
    }

    if (Number(amount) <= 0) {
      return toast.error("Amount must be greater than 0", { position: "bottom-right" });
    }

    try {
      const res = await api.post("/data/debit", {
        amount,
        description,
      });

      toast.success(res.data.message, { position: "bottom-right" });

      await getUser();
      await getHistory();

      setAmount("");
      setDescription("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Debit Failed", { position: "bottom-right" }
      );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-5">

        <h1 className="text-2xl font-bold mb-6">
          Welcome, {user.name} 👋
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="text-gray-500">
              Current Balance
            </h2>

            <p className="text-3xl font-bold text-green-600 mt-2">
              ₹ {user.balance}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h2 className="text-gray-500">
              Account Number
            </h2>

            <p className="text-2xl font-bold mt-2">
              {user.accountNo}
            </p>
          </div>

        </div>

        <div className="bg-white shadow rounded-xl p-5 mt-6">

          <h2 className="text-2xl font-bold mb-5">
            New Transaction
          </h2>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3 mb-5"
          />

          <div className="flex flex-col sm:flex-row gap-4">

            <button
              onClick={handleCredit}
              className="bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              Credit
            </button>

            <button
              onClick={handleDebit}
              className="bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Debit
            </button>
          </div>

        </div>

        <div className="bg-white shadow rounded-xl p-5 mt-6">

          <h2 className="text-2xl font-bold mb-5">
            Transaction History
          </h2>

          {transactions.length === 0 ? (
            <p className="text-center text-gray-500">
              No Transactions Found
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-200">

                  <tr>

                    <th className="p-3 text-left">
                      Type
                    </th>

                    <th className="p-3 text-left">
                      Amount
                    </th>

                    <th className="p-3 text-left">
                      Description
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {transactions.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b"
                    >
                      <td className="p-3">

                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${item.type === "credit"
                            ? "bg-green-600"
                            : "bg-red-600"
                            }`}
                        >
                          {item.type}
                        </span>

                      </td>

                      <td
                        className={`p-3 font-semibold ${item.type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                          }`}
                      >
                        {item.type === "credit"
                          ? `+ ₹${item.amount}`
                          : `- ₹${item.amount}`}
                      </td>

                      <td className="p-3">
                        {item.description || "-"}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </>
  );
};

export default Transaction;