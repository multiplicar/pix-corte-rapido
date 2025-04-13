
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Scissors } from 'lucide-react';

interface ServicePopularity {
  name: string;
  percentage: number;
}

interface PopularServicesProps {
  services: ServicePopularity[];
}

const PopularServices = ({ services }: PopularServicesProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Serviços Mais Populares</CardTitle>
            <CardDescription>Análise dos serviços mais requisitados</CardDescription>
          </div>
          <div className="rounded-full bg-barber-primary/10 p-2">
            <Scissors className="h-5 w-5 text-barber-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="flex justify-between items-center">
              <p className="font-medium">{service.name}</p>
              <p className="font-medium">{service.percentage}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularServices;
