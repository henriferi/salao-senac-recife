'use client'

import { useState } from "react";
import AuthGuard from "./components/AuthGuard";
import Loading from "./components/Loading";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);

  const stylesData = [
    {
      id: 1,
      image: '/cabelo2.jpg',
      title: 'Corte Moderno',
      description: 'Um corte cheio de estilo e modernidade.',
    },
    {
      id: 2,
      image: '/cabelo1.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 3,
      image: '/cabelo3.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 4,
      image: '/cabelo2.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 5,
      image: '/cabelo1.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
  ];

  const openModal = (style) => {
    setSelectedStyle(style);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStyle(null);
  };

  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });

  const [error, setError] = useState('');

  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função de validação do formulário
  const validateForm = () => {
    const today = new Date();
    const selectedDate = new Date(formData.date);
    const selectedTime = formData.time;

    // Validação para data não ser anterior ao dia de hoje
    if (selectedDate < today) {
      setError("A data não pode ser anterior ao dia de hoje.");
      return false;
    }

    // Validação para o horário ser entre 08:00 e 19:00
    const [hours, minutes] = selectedTime.split(':').map(Number);
    if (hours < 8 || hours > 19 || (hours === 19 && minutes > 0)) {
      setError("O horário deve ser entre 08:00 e 19:00.");
      return false;
    }

    setError(''); // Limpa a mensagem de erro se a validação passar
    return true;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Se a validação falhar, não submete o formulário
    if (!validateForm()) {
      return;
    }

    alert(`Agendamento realizado para: ${formData.date} às ${formData.time}`);
    setIsModalOpen(false);
  };

  return (
    <AuthGuard>
      <Loading delay={300} />
      <div className="bg-gray-100 min-h-screen">
        <div className="text-center p-8 bg-bgCards rounded-lg mx-4 my-8 shadow-md">
          <img src="/senac.png" alt="Logo Senac" className="mx-auto w-32 h-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Venha conhecer nossos serviços!</h1>
          <p>
            Transforme seu visual com os melhores profissionais do Senac.
          </p>
          <p className="mt-2">
            Contato: (81) 99999-9999 | Email: contato@senacpe.com.br
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center gap-8 p-2">
          {stylesData.map((style) => (
            <div
              key={style.id}
              className="bg-bgCards shadow-md overflow-hidden flex flex-col justify-between border border-customBlue hover:shadow-lg transition-shadow"
            >
              <img
                src={style.image}
                alt={style.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{style.title}</h2>
                <p className="text-gray-600">{style.description}</p>
                <button
                  onClick={() => openModal(style)}
                  className="bg-customBlue w-52 text-white py-2 px-4 rounded mt-4 hover:bg-customOrange transition"
                >
                  DÊ MATCH
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 w-screen bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl text-customBlue font-bold">{selectedStyle?.title}</h2>
              <img
                src={selectedStyle?.image}
                alt={selectedStyle?.title}
                className="w-96 my-4"
              />
              <p>{selectedStyle?.description}</p>
              <div className="bg-white mt-4 p-2 max-w-sm w-full border-t border-customBlue">
                <h2 className="text-xl text-customBlue font-bold text-center mb-6">Agendar Serviço</h2>
                
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Data:
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                      min={new Date().toISOString().split('T')[0]} 
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                      Hora:
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                      min="08:00"   
                      max="19:00"   
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-customBlue w-52 text-white py-2 px-4 rounded hover:bg-customOrange transition"
                    >
                      Agendar
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
