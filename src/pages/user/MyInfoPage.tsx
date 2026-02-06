import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { Trash2, AlertTriangle } from "lucide-react";
import { ProfileSidebar } from "../../components/User/ProfileSidebar";

interface PersonalInfo {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

interface DeliveryInfo {
  address: string;
  bairro: string;
  cidade: string;
  cep: string;
}

export const MyInfoPage: React.FC = () => {
  const { user, deleteAccount } = useUserAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [personal, setPersonal] = useState<PersonalInfo>({
    name: user?.name || "",
    cpf: "000.000.000-00",
    email: user?.email || "",
    phone: "(00) 00000-0000",
  });

  useEffect(() => {
    if (user) {
      setPersonal((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone || prev.phone,
      }));

      setDelivery((prev) => ({
        ...prev,
        address: user.address || prev.address,
        bairro: user.bairro || prev.bairro,
        cidade: user.cidade || prev.cidade,
        cep: user.cep || prev.cep,
      }));
    }
  }, [user]);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir conta", error);
      alert("Erro ao excluir conta. Tente novamente.");
    }
  };

  const [delivery, setDelivery] = useState<DeliveryInfo>({
    address: "Rua João Pessoa, 333",
    bairro: "Centro",
    cidade: "Fortaleza, Ceará",
    cep: "433-8800",
  });

  const handleSave = () => {
    const usersDb = JSON.parse(localStorage.getItem("users_db") || "[]");
    const updatedUsers = usersDb.map((u: any) => {
      if (u.email === user?.email) {
        return {
          ...u,
          name: personal.name,
          phone: personal.phone,
          address: delivery.address,
          bairro: delivery.bairro,
          cidade: delivery.cidade,
          cep: delivery.cep,
        };
      }
      return u;
    });
    localStorage.setItem("users_db", JSON.stringify(updatedUsers));

    setEditing(false);
    alert("Informações atualizadas com sucesso!");
  };

  return (
    <div className="bg-light-gray min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          Home <span className="text-gray-400">/</span> Meus Pedidos{" "}
          <span className="text-gray-400">/</span> Minhas Informações
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <ProfileSidebar />

          <main className="flex-1">
            <div className="bg-white rounded shadow-sm border">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="font-bold text-gray-800">Minhas Informações</h2>
                {!editing ? (
                  <button
                    className="text-primary font-bold text-sm"
                    onClick={() => setEditing(true)}
                  >
                    Editar
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <button
                      className="bg-primary text-white text-sm font-bold px-4 py-2 rounded hover:bg-pink-700"
                      onClick={handleSave}
                    >
                      Salvar
                    </button>
                    <button
                      className="text-gray-500 text-sm font-bold"
                      onClick={() => setEditing(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              <div className="px-6 py-6 border-b">
                <h3 className="font-bold text-gray-800 mb-4">
                  Informações Pessoais
                </h3>
                {!editing ? (
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Nome:</span>{" "}
                      <span className="font-bold text-gray-800">
                        {personal.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">CPF:</span>{" "}
                      <span className="font-bold text-gray-800">
                        {personal.cpf}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>{" "}
                      <span className="font-bold text-gray-800">
                        {personal.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Celular:</span>{" "}
                      <span className="font-bold text-gray-800">
                        {personal.phone}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-500 text-sm">Nome</label>
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        value={personal.name}
                        onChange={(e) =>
                          setPersonal({ ...personal, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">CPF</label>
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        value={personal.cpf}
                        onChange={(e) =>
                          setPersonal({ ...personal, cpf: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">Email</label>
                      <input
                        type="email"
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        value={personal.email}
                        onChange={(e) =>
                          setPersonal({ ...personal, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">Celular</label>
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        value={personal.phone}
                        onChange={(e) =>
                          setPersonal({ ...personal, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-6">
                <h3 className="font-bold text-gray-800 mb-4">
                  Informações de Entrega
                </h3>
                {!editing ? (
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Endereço:</span>{" "}
                      <span className="font-bold text-gray-800">
                        {delivery.address}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Bairro:</span>{" "}
                      <span className="font-bold text-gray-800">
                        {delivery.bairro}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Cidade:</span>{" "}
                      <span className="font-bold text-gray-800">
                        {delivery.cidade}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">CEP:</span>{" "}
                      <span className="font-bold text-gray-800">
                        {delivery.cep}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-gray-500 text-sm">Endereço</label>
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        value={delivery.address}
                        onChange={(e) =>
                          setDelivery({ ...delivery, address: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">Bairro</label>
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        value={delivery.bairro}
                        onChange={(e) =>
                          setDelivery({ ...delivery, bairro: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">Cidade</label>
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        value={delivery.cidade}
                        onChange={(e) =>
                          setDelivery({ ...delivery, cidade: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-sm">CEP</label>
                      <input
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        value={delivery.cep}
                        onChange={(e) =>
                          setDelivery({ ...delivery, cep: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-6 border-t bg-red-50 rounded-b-lg">
                <h3 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Zona de Perigo
                </h3>
                <p className="text-sm text-red-600 mb-4">
                  Excluir sua conta apagará permanentemente todos os seus dados,
                  histórico de pedidos e informações salvas. Esta ação não pode
                  ser desfeita.
                </p>

                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center gap-2 text-red-600 font-bold text-sm border border-red-200 bg-white px-4 py-2 rounded hover:bg-red-50 hover:border-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir minha conta
                  </button>
                ) : (
                  <div className="bg-white p-4 rounded border border-red-200">
                    <p className="font-bold text-gray-800 mb-2">
                      Tem certeza que deseja excluir sua conta?
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={handleDeleteAccount}
                        className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded hover:bg-red-700"
                      >
                        Sim, excluir tudo
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="text-gray-600 text-sm font-bold px-4 py-2 hover:bg-gray-100 rounded"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
