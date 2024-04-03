import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, getDay, addMinutes, setHours, setMinutes } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import './Agendamento.css'; 

function Agendamento() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState(() => {
    const savedSlots = localStorage.getItem('bookedSlots');
    return savedSlots ? JSON.parse(savedSlots) : {};
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
  }, [bookedSlots]);

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0; // 0 é Domingo
  };

  const handleTimeSlotClick = (time) => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const isBooked = bookedSlots[dateStr]?.includes(time);

    if (isBooked) {
      alert('Este horário já está agendado.');
      return;
    }

    const confirm = window.confirm(`Você deseja agendar o horário das ${time}?`);
    if (confirm) {
      const newBookedSlots = { ...bookedSlots, [dateStr]: [...(bookedSlots[dateStr] || []), time] };
      setBookedSlots(newBookedSlots);
      alert('Horário agendado com sucesso!');
    }
  };

  const generateTimeSlots = (date) => {
    const slots = [];
    let startTime = setHours(setMinutes(date, 0), 9); // Inicia às 9:00
    const endTime = setHours(setMinutes(date, 0), 18); // Termina às 18:00

    while (startTime < endTime) {
      if (getDay(startTime) !== 12 && getDay(startTime) !== 13) { // Ajuste para não incluir 12-13h
        const timeString = format(startTime, 'HH:mm');
        slots.push(
          <button key={timeString} disabled={bookedSlots[format(date, 'yyyy-MM-dd')]?.includes(timeString)} className="time-slot-btn" onClick={() => handleTimeSlotClick(timeString)}>
            {timeString}
          </button>
        );
      }
      startTime = addMinutes(startTime, 30); // Incrementa de 30 em 30 minutos
    }

    return slots;
  };

  return (
    <div className="agendamento-layout">
      <div className="calendar-container">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          filterDate={isWeekday}
          minDate={new Date()} // Bloqueia datas anteriores ao dia atual
          inline
        />
      </div>
      <div className="time-slots-container">
        {selectedDate && generateTimeSlots(selectedDate)}
      </div>
      <button className="back-btn" onClick={() => navigate('/')}>Voltar</button>
    </div>
  );
}

export default Agendamento;
