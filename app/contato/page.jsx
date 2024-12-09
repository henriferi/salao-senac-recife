'use client'

import React, { useEffect } from 'react';
import AuthGuard from "../components/AuthGuard";
import Loading from "../components/Loading";
import Logout from "../components/Logout";

export default function Contato() {

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -8.04713, lng: -34.89121 },
        zoom: 14,
      });

      new window.google.maps.Marker({
        position: { lat: -8.052595, lng: -34.8852127 },
        map: map,
        title: "Senac Recife - Salão de Beleza",
      });
    };
    window.initMap = initMap;

  }, []);

  return (
    <AuthGuard>
      <Loading delay={300} />
      <Logout />
      <div className="flex flex-col lg:flex-row justify-between p-6">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-2xl font-bold text-customBlue">Entre em Contato</h2>

          <div>
            <p className="text-lg font-medium text-customBlue">Telefone</p>
            <p className="text-sm">+55 (81) 1234-5678</p>
          </div>

          <div>
            <p className="text-lg font-medium text-customBlue">E-mail</p>
            <p className="text-sm">contato@salonsenac.com</p>
          </div>

          <div>
            <p className="text-lg font-medium text-customBlue">Horário de Funcionamento</p>
            <p className="text-sm">Segunda a Sexta: 9:00 - 18:00</p>
            <p className="text-sm">Sábado: 9:00 - 14:00</p>
          </div>

          <div>
            <p className="text-lg font-medium text-customBlue">Endereço</p>
            <p className="text-sm">Avenida Visconde de Suassuna 500 - Santo Amaro</p>
          </div>
        </div>
        <div className="lg:w-1/2" id="map" style={{ height: "400px" }}></div>
      </div>

        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`}
          async
          defer
        ></script>
    </AuthGuard>
  );
}


