// Mapping for column names from API to user-friendly labels
export const columnMapping: { [key: string]: string } = {
    "AVG(r.difficulty)": "Difficulty",
    "AVG(r.analyticalThinking)": "Analytical",
    "AVG(r.creativity)": "Creativity",
    "AVG(r.collaboration)": "Collaboration",
    "subject": "Subject",
    "name": "Course Name",
    "cId": "Course Code",
  };

  /**
   * Maps the column names of fetched data to their friendly names.
   * @param data Array of objects from API
   * @returns Array of objects with mapped column names
   */
  export const mapColumns = (data: any[]): any[] => {
    return data.map((entry) => {
      const newEntry: any = {};
      Object.keys(entry).forEach((key) => {
        const newKey = columnMapping[key] || key;
        newEntry[newKey] = entry[key];
      });
      return newEntry;
    });
  };
