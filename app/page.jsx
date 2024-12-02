'use client'

import { useState } from "react";
import AuthGuard from "./components/AuthGuard";
import Loading from "./components/Loading";
import Logout from "./components/Logout";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const today = new Date();
    const selectedDate = new Date(formData.date);
    const selectedTime = formData.time;

    if (selectedDate < today) {
      setError("A data não pode ser anterior ao dia de hoje.");
      return false;
    }

    const [hours, minutes] = selectedTime.split(':').map(Number);
    if (hours < 8 || hours > 19 || (hours === 19 && minutes > 0)) {
      setError("O horário deve ser entre 08:00 e 19:00.");
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    alert(`Agendamento realizado para: ${formData.date} às ${formData.time}`);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Loading delay={300} />
      <Logout />
      <div className="min-h-screen my-4">
        <div className="text-center bg-bgCards rounded-lg shadow-md p-6 mx-4 sm:mx-auto max-w-4xl">
          <img src="/senac.png" alt="Logo Senac" className="mx-auto w-32 h-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Venha conhecer nossos serviços!</h1>
          <p>
            Transforme seu visual com os melhores profissionais do Senac.
          </p>
          <p className="mt-2">
            Contato: (81) 99999-9999 | Email: contato@senacpe.com.br
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
          {stylesData.map((style) => (
            <div
              key={style.id}
              className="bg-bgCards shadow-md overflow-hidden flex flex-col justify-between border border-customBlue hover:shadow-lg transition-shadow"
            >
              <img
                src={style.image}
                alt={style.title}
                className="w-full sm:h-96 lg:h-80 xl:h-96  object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{style.title}</h2>
                <p className="text-gray-600">{style.description}</p>
                <button
                  onClick={() => openModal(style)}
                  className="bg-customBlue w-full sm:w-52 text-white py-2 px-4 rounded mt-4 hover:bg-customOrange transition"
                >
                  DÊ MATCH
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 w-screen bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl text-center font-semibold text-customBlue">MATCH</h2>
              <h2 className="text-xl text-customBlue font-bold">{selectedStyle?.title}</h2>
              <img
                src={selectedStyle?.image}
                alt={selectedStyle?.title}
                className="w-full my-4 rounded"
              />
              <p>{selectedStyle?.description}</p>
              <div className="mt-4">
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
                      className="bg-customBlue w-full sm:w-52 text-white py-2 px-4 rounded hover:bg-customOrange transition"
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
    </div>
  );
}
