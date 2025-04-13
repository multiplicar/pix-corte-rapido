
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface Appointment {
  clientName: string;
  service: string;
  time: string;
  date: string;
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

const UpcomingAppointments = ({ appointments }: UpcomingAppointmentsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximos Agendamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{appointment.clientName}</p>
                <p className="text-sm text-muted-foreground">{appointment.service}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{appointment.time}</p>
                <p className="text-sm text-muted-foreground">{appointment.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
