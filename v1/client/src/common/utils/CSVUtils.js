class BlobDownloader {
  download(content, filename = 'filename', options = {}) {
    let blob
    if (typeof content === 'string') {
      blob = new Blob([content], options)
    } else {
      blob = new Blob(content, options)
    }

    if (navigator?.msSaveBlob) {
      // Para o Internet Explorer
      navigator?.msSaveBlob(blob, filename)
    } else {
      // Para outros navegadores
      const link = document.createElement('a')
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', filename)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }
}

class ExportCSV {
  loading = false

  convertAndExport(data, filename = 'csvFile') {
    this.downloadCsv(this.convertToCsv(data), filename)
  }

  convertToCsv(data) {
    const csvRows = []

    // Obter os cabeçalhos do CSV
    const headers = Object.keys(data[0])
    csvRows.push(headers.join(','))

    // Converter cada objeto em uma linha do CSV
    for (const obj of data) {
      const values = headers.map((objKey) => obj[objKey])
      csvRows.push(values.join(','))
    }

    // Concatenar todas as linhas com quebras de linha
    return csvRows.join('\n')
  }

  downloadCsv(csvContent, filename = 'csvFile') {
    const blob = new BlobDownloader()
    blob.download(csvContent, filename, null)
  }
}
export { ExportCSV, BlobDownloader }
