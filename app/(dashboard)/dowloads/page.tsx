export default function DownloadPage() {
    const downloads = [
        {
            title: "Android App",
            description: "Download the AutOBot Android application to control and manage your robot from your phone.",
            button: "Download APK",
            link: "https://drive.google.com/file/d/1jMpbV9HIeEHezylkLoPKubWp-y333IDW/view?usp=drive_link",
        },
        {
            title: "AutOBot Agent",
            description: "Run AutOBot agent on your computer to upload code to your robot.",
            button: "Download Installer",
            link: "https://drive.google.com/file/d/1MemTtz1GKnvhpsyQF9dfMenrCq4RgQXD/view?usp=sharing",
        },
        {
            title: "CP210x Driver",
            description: "Install the CP210x USB-to-UART driver required for connecting microcontrollers.",
            button: "Download Driver",
            link: "https://www.silabs.com//documents/public/software/CP210x_Universal_Windows_Driver.zip",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-16 px-6">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold text-center mb-12">
                    Downloads
                </h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {downloads.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-8 flex flex-col h-full text-center hover:shadow-lg transition"
                        >

                            <h2 className="text-xl font-semibold mb-2">
                                {item.title}
                            </h2>

                            <p className="text-gray-600 mb-6">
                                {item.description}
                            </p>

                            <a
                                href={item.link}
                                className="mt-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                {item.button}
                            </a>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}