import NotifyUtils from 'src/common/utils/NotifyUtils';

export interface CsvData {
  [key: string]: string | number; // Define os tipos das propriedades do objeto
}

declare global {
  interface Navigator {
    msSaveBlob: (blob: Blob, fileName: string) => boolean;
  }
}

class ExportCSV {
  notify = NotifyUtils;

  loading = false;

  convertAndExport(data: CsvData[], filename = 'csvFile') {
    this.downloadCsv(this.convertToCsv(data), filename);
  }

  convertToCsv(data: CsvData[]): string {
    const csvRows: string[] = [];

    // Obter os cabeçalhos do CSV
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    // Converter cada objeto em uma linha do CSV
    for (const obj of data) {
      const values = headers.map((header) => {
        const cellValue = obj[header] || '';
        return typeof cellValue === 'string' ? `"${cellValue}"` : cellValue;
      });
      csvRows.push(values.join(','));
    }

    // Concatenar todas as linhas com quebras de linha
    return csvRows.join('\n');
  }

  downloadCsv(csvContent: string, filename = 'csvFile'): void {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) {
      // Para o Internet Explorer
      navigator.msSaveBlob(blob, filename);
    } else {
      // Para outros navegadores
      const link = document.createElement('a');
      if (link.download != undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
export { ExportCSV };
