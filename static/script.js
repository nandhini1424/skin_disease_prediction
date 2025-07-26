let lastPrediction = "";

const descriptions = {
    herpes: {
        en: "Herpes is a viral infection causing sores on the mouth or genitals.",
        ta: "ஹெர்பஸ் என்பது வைரஸ் தொற்றாகும், இது வாய் அல்லது பாலுறுப்புகளில் புண்களை ஏற்படுத்தும்.",
        fr: "L'herpès est une infection virale provoquant des plaies.",
        es: "El herpes es una infección viral que causa llagas.",
        ar: "الهربس عدوى فيروسية تسبب تقرحات.",
        hi: "हरपीज एक वायरल संक्रमण है जो घाव पैदा करता है।",
        te: "హెర్పీస్ ఒక వైరల్ ఇన్ఫెక్షన్.",
        ml: "ഹെർപ്പ്സ് ഒരു വൈറൽ ഇൻഫക്ഷനാണ്."
    },
    lupus: {
        en: "Lupus is an autoimmune disease causing inflammation and skin rashes.",
        ta: "லூபஸ் என்பது சளைக்கூறுகள் தாக்கும் தன்னிச்சையான நோயாகும், தோலில் வீக்கம் மற்றும் ரேஷ்கள் ஏற்படுகின்றன.",
        fr: "Le lupus est une maladie auto-immune provoquant une inflammation et des éruptions cutanées.",
        es: "El lupus es una enfermedad autoinmune que causa inflamación y erupciones en la piel.",
        ar: "الذئبة هي مرض مناعي ذاتي يسبب التهابات وطفح جلدي.",
        hi: "लुपस एक स्वप्रतिरक्षित बीमारी है जो सूजन और त्वचा पर चकत्ते लाती है।",
        te: "లూపస్ అనేది చర్మంపై వాపు మరియు రాషెస్ కలిగించే ఆటోఇమ్యూన్ రోగం.",
        ml: "ലൂപസ് ഒരു ഓട്ടോയിമ്യൂൺ രോഗമാണ്, ഇത് വാതകവും ത്വക്ക് ചുളിവുകളും ഉണ്ടാക്കുന്നു."
    },
    melanoma: {
        en: "Melanoma is a serious form of skin cancer that develops in pigment cells.",
        ta: "மெலனோமா என்பது மேலனின் செல்களில் உருவாகும் கடுமையான தோல் புற்றுநோயாகும்.",
        fr: "Le mélanome est une forme grave de cancer de la peau qui se développe dans les cellules pigmentaires.",
        es: "El melanoma es una forma grave de cáncer de piel que se desarrolla en las células pigmentarias.",
        ar: "الميلانوما هو نوع خطير من سرطان الجلد يتطور في الخلايا الصبغية.",
        hi: "मेलानोमा त्वचा के कैंसर का एक गंभीर प्रकार है जो रंजक कोशिकाओं में होता है।",
        te: "మెలనోమా అనేది రంగు కణాలలో అభివృద్ధి చెందే తీవ్రమైన చర్మ క్యాన్సర్ రూపం.",
        ml: "മെലനോമ ഒരു ഗಂಭീരമായ ത്വക്ക് കാൻസർ രൂപമാണ്, പിഗ്മെന്റ് കോശങ്ങളിൽ ഉദ്ഭവിക്കുന്നു."
    },
    monkeypox: {
        en: "Monkeypox is a viral disease that causes fever, rash, and swollen lymph nodes.",
        ta: "மங்கிபாக்ஸ் என்பது காய்ச்சல், தோல் ரேஷ் மற்றும் வீங்கிய லிம்ப் நூடுகளை ஏற்படுத்தும் வைரஸ் நோயாகும்.",
        fr: "La variole du singe est une maladie virale causant fièvre, éruptions et ganglions enflés.",
        es: "La viruela del mono es una enfermedad viral que causa fiebre, sarpullido e inflamación de ganglios.",
        ar: "جدري القرود هو مرض فيروسي يسبب الحمى والطفح الجلدي وتورم الغدد اللمفاوية.",
        hi: "मंकीपॉक्स एक वायरल रोग है जिससे बुखार, चकत्ते और सूजन होती है।",
        te: "మంకీపాక్స్ అనేది జ్వరాన్ని, రాషెస్‌ను మరియు వాపు గల గ్రంథులను కలిగించే వైరస్ వ్యాధి.",
        ml: "മങ്കീപോക്സ് ഒരു വൈറസ് രോഗമാണ്, ജ്വരം, ത്വക്ക് രാഷ്, വീങ്ങിയ ലിംഫ് ഗ്രന്ഥികൾ എന്നിവയെ ഉണ്ടാക്കുന്നു."
    },
    sarampion: {
        en: "Sarampion (Measles) is a contagious disease causing fever and red skin rash.",
        ta: "சராம்பியோன் (சீமைத்தும்மல்) என்பது காய்ச்சலும் சிவப்பு தோல் ரேஷையும் ஏற்படுத்தும் தொற்றுநோயாகும்.",
        fr: "La rougeole (sarampion) est une maladie contagieuse avec fièvre et éruption cutanée rouge.",
        es: "El sarampión es una enfermedad contagiosa que causa fiebre y erupciones rojas en la piel.",
        ar: "الحصبة هي مرض معد يسبب الحمى وطفح جلدي أحمر.",
        hi: "खसरा एक संक्रामक रोग है जो बुखार और लाल चकत्ते पैदा करता है।",
        te: "సారంపియన్ అనేది జ్వరాన్ని, ఎరుపు రాషెస్‌ను కలిగించే అంటువ్యాధి.",
        ml: "സാരമ്പിയോൺ (മീസിൽസ്) ഒരു അണുബാധയുള്ള രോഗമാണ്, ജ്വരവും ചുവന്ന ത്വക്ക് രാഷും ഉണ്ടാക്കുന്നു."
    },
    sarna: {
        en: "Sarna is a skin condition associated with inflammation, redness, and discomfort.",
        ta: "சர்னா என்பது அழற்சி, சிவப்பு மற்றும் 불편த்துடன் கூடிய தோல் நிலை.",
        fr: "La sarna est un trouble cutané avec inflammation, rougeur et inconfort.",
        es: "La sarna es una condición de la piel con inflamación, enrojecimiento y molestia.",
        ar: "السَرْنَة هي حالة جلدية تسبب الالتهاب والاحمرار والانزعاج.",
        hi: "सर्ना एक त्वचा की स्थिति है जिसमें सूजन, लालिमा और असहजता होती है।",
        te: "సర్నా అనేది వాపు, ఎర్రదనం మరియు అసౌకర్యాన్ని కలిగించే చర్మ స్థితి.",
        ml: "സർനാ ഒരു ത്വക്ക് പ്രശ്‌നം ആണിത്, വാതകവും ചുവപ്പും അസ്വസ്ഥതയും ഉള്ളത്."
    },
    varicela: {
        en: "Varicela (Chickenpox) is a viral disease with itchy, blister-like rashes.",
        ta: "வரிசெல்லா (சிக்கன்பாக்ஸ்) என்பது குடைபிடித்த ரேஷ்களுடன் கூடிய வைரஸ் நோயாகும்.",
        fr: "La varicelle est une maladie virale avec des éruptions de type cloques qui démangent.",
        es: "La varicela es una enfermedad viral con erupciones similares a ampollas que pican.",
        ar: "الحماق هو مرض فيروسي يسبب طفح جلدي مع بثور مثيرة للحكة.",
        hi: "वेरिसेला (चिकनपॉक्स) एक वायरल बीमारी है जिसमें खुजली वाले दाने होते हैं।",
        te: "వెరిసెల్లా (చికెన్‌పాక్స్) అనేది గాజుపట్టినట్లుగా ఉండే రాషెస్ కలిగించే వైరస్ వ్యాధి.",
        ml: "വെരിസെല്ല (ചിക്കൻപോക്സ്) കുത്തുകളും ഉറവുകളും ഉള്ള വൈറസ് രോഗമാണ്."
    },
    normal: {
        en: "No significant skin disease detected. The skin appears normal.",
        ta: "முக்கியமான சரீர நோய் கண்டறியப்படவில்லை. தோல் சாதாரணமாக தெரிகிறது.",
        hi: "कोई महत्वपूर्ण त्वचा रोग नहीं पाया गया। त्वचा सामान्य है।",
        fr: "Aucune maladie cutanée importante détectée. La peau semble normale.",
        es: "No se detectó ninguna enfermedad significativa. La piel parece normal.",
        ar: "لم يتم الكشف عن أي مرض جلدي مهم. الجلد يبدو طبيعياً.",
        te: "గణనీయమైన చర్మ వ్యాధి కనుగొనబడలేదు. చర్మం సాధారణంగా కనిపిస్తుంది.",
        ml: "പ്രധാനപ്പെട്ട ത്വക്ക് രോഗം കണ്ടെത്തിയില്ല. ത്വക്ക് സാധാരണമാണ്."
    }    
    // Add other disease descriptions (lupus, melanoma, monkeypox, sarampion, sarna, varicella) like earlier.
};

document.getElementById('language-select').addEventListener('change', function () {
    const lang = this.value;
    changeLanguage(lang);
    if (lastPrediction) {
        updateDiseaseInfo(lastPrediction, lang);
    }
});

function changeLanguage(lang) {
    const titles = {
        en: "Skin Disease Detection",
        ta: "சரீரியல் நோய்கள் கண்டறிதல்",
        fr: "Détection des maladies de la peau",
        es: "Detección de enfermedades de la piel",
        ar: "كشف أمراض الجلد",
        hi: "त्वचा रोग पहचान",
        te: "చర్మ వ్యాధి గుర్తింపు",
        ml: "ത്വക്ക് രോഗം തിരിച്ചറിയല്‍"
    };

    const subtitles = {
        en: "Upload an image to predict skin conditions",
        ta: "நோய் நிலைகளை கணிப்பதற்கு படம் பதிவேற்றவும்",
        fr: "Téléchargez une image pour prédire les affections cutanées",
        es: "Sube una imagen para predecir enfermedades de la piel",
        ar: "قم بتحميل صورة لتوقع أمراض الجلد",
        hi: "त्वचा की स्थिति का पूर्वानुमान लगाने के लिए छवि अपलोड करें",
        te: "చర్మ పరిస్థితులను అంచనా వేయడానికి చిత్రం అప్‌లోడ్ చేయండి",
        ml: "ത്വക്ക് രോഗങ്ങൾ പ്രവചിക്കാൻ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക"
    };

    document.getElementById('title').textContent = titles[lang] || titles['en'];
    document.getElementById('subtitle').textContent = subtitles[lang] || subtitles['en'];
}

function updateDiseaseInfo(predicted, lang) {
    const diseaseKey = predicted.toLowerCase().trim();
    const description = descriptions[diseaseKey]?.[lang] || descriptions[diseaseKey]?.en || "---";

    document.getElementById('disease-description').textContent = description;

    if (!descriptions[diseaseKey]) {
        console.warn(`⚠️ No description found for predicted label: '${predicted}'`);
    }
}

// ✅ Upload image and preview
document.getElementById('imageUpload').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const uploadAlertBox = document.getElementById('customAlert');
        uploadAlertBox.style.display = 'block';
        setTimeout(() => {
            uploadAlertBox.style.display = 'none';
        }, 3000);

        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// ✅ Predict Button
document.getElementById('predictBtn').addEventListener('click', function () {
    const input = document.getElementById('imageUpload');
    const file = input.files[0];

    if (!file) {
        alert('Please upload an image first.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    const predictBtn = this;
    predictBtn.innerHTML = "Predicting... 🔄";
    predictBtn.disabled = true;

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.label) {
            lastPrediction = data.label;

            // document.getElementById('prediction-text').textContent = `Prediction: ${data.label}`;
            document.getElementById('predicted-class').textContent = `Predicted Class: ${data.label}`;
            document.getElementById('confidence').textContent = `Confidence: ${(data.confidence * 100).toFixed(2)}%`;

            const lang = document.getElementById('language-select').value;
            updateDiseaseInfo(data.label, lang);

            const predictAlertBox = document.getElementById('predictAlert');
            predictAlertBox.style.display = 'block';
            setTimeout(() => {
                predictAlertBox.style.display = 'none';
            }, 3000);
        } else {
            alert('Prediction failed.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong.');
    })
    .finally(() => {
        predictBtn.innerHTML = "Predict";
        predictBtn.disabled = false;
    });
});
