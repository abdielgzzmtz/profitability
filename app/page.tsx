import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ClockIcon, CloudUpload, DatabaseBackup, History, RefreshCcw, RefreshCwOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type TimelineItem = {
  date: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  icon: React.ReactNode;
};

function ContextDefinition({ children, description }: { children: React.ReactNode; description: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <span className="underline decoration-dotted cursor-help">{children}</span>
      </HoverCardTrigger>
      <HoverCardContent className="font-mono text-sm">
        {description}
      </HoverCardContent>
    </HoverCard>
  );
}

const timelineItems: TimelineItem[] = [
  {
    date: "18:00 P.M.",
    title: <p>Inicio de la <ContextDefinition description="Base de datos espejo del servidor central, actualizada con información consolidada hasta las 00:00 horas del día en curso.">Réplica Offline</ContextDefinition> - Bnext</p>,
    description: <p className="text-sm text-muted-foreground">La base de datos réplica de central se inicia y comienza a sincronizar los datos del <ContextDefinition description="Base de datos central en la que se almacena toda la información de la operación de Heineken.">servidor central</ContextDefinition>.</p>,
    icon: <RefreshCcw className="size-4" />,
  },
  {
    date: "00:00 A.M.",
    title: <p>Fin de la <ContextDefinition description="Base de datos espejo del servidor central, actualizada con información consolidada hasta las 00:00 horas del día en curso.">Réplica Offline</ContextDefinition> - Bnext</p>,
    description: <p className="text-sm text-muted-foreground">La base de datos réplica de central ha completado la sincronización con el <ContextDefinition description="Base de datos central en la que se almacena toda la información de la operación de Heineken.">servidor central</ContextDefinition>. </p>,
    icon: <RefreshCwOff className="size-4" />,
  },
  {
    date: "01:30 A.M.",
    title: <p>Extracción de la información - Bnext</p>,
    description: <div><p className="text-sm text-muted-foreground">Se inicia el proceso de extracción de información desde la base de datos <ContextDefinition description="Base de datos espejo del servidor central, actualizada con información consolidada hasta las 00:00 horas del día en curso.">réplica offline</ContextDefinition> hacia la base de datos Profitability.

      Esta base de datos es una representación del <ContextDefinition description="Reporte detallado de ventas por tienda.">Reporte 7</ContextDefinition> de ventas.

      Se extraen 16 catálogos del sistema y, principalmente, la información de ventas. Algunas de las tablas creadas para este proceso son:</p>  <ul className="list-decimal ml-7 text-sm pt-2"><li>orders - <span className="text-muted-foreground">Tickets de venta</span></li><li>order_lines - <span className="text-muted-foreground">Desglose de los tickets de venta</span></li><li>order_line_discounts - <span className="text-muted-foreground">Descuentos aplicados</span></li><li>order_line_taxes - <span className="text-muted-foreground">Impuestos aplicados</span></li><li>order_line_cancellations - <span className="text-muted-foreground">Tickets cancelados</span></li><li>journals - <span className="text-muted-foreground">Pólizas</span></li><li>document_journals - <span className="text-muted-foreground">Relación Póliza - Ticket de venta</span></li></ul></div>,
    icon: <DatabaseBackup className="size-4" />},
  {
    date: "02:15 A.M.",
    title: <p>Fin de extracción de la información - Bnext</p>,
    description: <p className="text-sm text-muted-foreground">Se concluye el proceso de extracción de información desde la base de datos Réplica Offline hacia la base de datos Profitability.</p>,
    icon: <RefreshCwOff className="size-4" />},
  {
    date: "03:00 A.M.",
    title: <p>Extracción de la información - Heineken</p>,
    description: <p className="text-sm text-muted-foreground">Se inicia el proceso de extracción de información desde la base de datos Profitability hacia SAP a través de jobs de Azure.</p>,
    icon: <CloudUpload className="size-4" />},
];

export default function Home() {
  return (
    <>
      <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center pt-4 md:pt-8 font-mono">
        <section className="w-full max-w-xl px-4 md:px-0">
          <div className="flex w-full flex-row justify-between items-center mb-6">
            <div className="flex flex-row gap-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                Profitability
              </h1>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" className="cursor-pointer" size="icon">
                    <History className="size-4 text-muted-foreground" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Historia de Profitability</DrawerTitle>
                      <DrawerDescription>El proyecto inició a principios de 2020 como una colaboración entre Bnext y Heineken.</DrawerDescription>
                      <p className="text-sm text-muted-foreground pt-2">Surge a partir de la necesidad de Heineken de mejorar la visibilidad y el análisis de la rentabilidad de sus operaciones, de manera más eficiente y precisa.</p>
                      <p className="text-sm text-muted-foreground pt-2">En 2020, se implementó un proceso mediante el cual la información generada en el Reporte 7 se transfería directamente desde el servidor central a archivos CSV, los cuales eran enviados a un servidor FTP de Heineken.</p>
                      <p className="text-sm text-muted-foreground pt-2">En 2021, con el objetivo de evitar cualquier afectación al servidor central, el proceso fue migrado a una base de datos PostgreSQL. Esta nueva implementación se alimentaba de una base de datos espejo del servidor central, reduciendo así el impacto en la operación productiva.</p>
                      <p className="text-sm text-muted-foreground pt-2">Desde 2022, el proyecto opera bajo el esquema actual, consolidando la arquitectura y el flujo de información vigente.</p>
                    </DrawerHeader>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Cerrar</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>

            <div className="flex gap-1 flex-row">
              <Image src="/heineken.png" alt="Heineken Logo" priority width={512} height={182} className="w-30" />
            </div>
          </div>
          <Accordion type="multiple" className="w-full">
            {timelineItems.map((item, index) => (
              <div
                key={item.date}
                className="flex w-full flex-col items-center"
              >
                <AccordionItem value={`item-${index}`} className="w-full rounded-xl border bg-accent px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex w-full flex-row items-center justify-between gap-2 pr-2">
                      <div className="text-left uppercase flex items-center gap-4">
                        {item.icon}
                        {item.title}
                      </div>
                      <span className="flex shrink-0 flex-row items-center gap-1 text-xs text-muted-foreground">
                        <ClockIcon className="size-3" />
                        {item.date}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.description}
                  </AccordionContent>
                </AccordionItem>

                {index < timelineItems.length - 1 && (
                  <div className="h-8 w-px bg-border" aria-hidden="true" />
                )}
              </div>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="text-xs flex-row gap-1 text-muted-foreground items-center justify-center w-full flex py-4">
        Hecho por <Link href="https://bnext.mx" target="_blank" className="underline">Bnext</Link>
      </footer>
    </>
  );
}
