import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircleRounded,
  ContentCopyRounded,
  CloudUploadRounded,
  ArrowForwardRounded,
  CheckRounded,
  WarningRounded,
  GroupAddRounded,
} from "@mui/icons-material";

export default function Enroll() {
  const navigate = useNavigate();
  const location = useLocation();
  const tournamentData = location.state?.tournament;
  const categoryData = location.state?.category; // e.g. "Men's Singles" or "Mixed Doubles"

  const [selectedGateway, setSelectedGateway] = useState("KBZ Pay");
  const [copied, setCopied] = useState(false);
  const [slipFile, setSlipFile] = useState(null);

  // Partner State for Doubles Categories
  const [selectedPartner, setSelectedPartner] = useState("");

  // Modal states
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Mock registered players list for Doubles partner selection (Real data မှာ API ကနေ လာပါမယ်)
  const availablePartners = [
    { id: "p1", name: "Aung Thiha (YGN Badminton Club)", gender: "Male" },
    { id: "p2", name: "Nilar Kyaw (Mandalay Racquet Club)", gender: "Female" },
    { id: "p3", name: "Su Myat Noe (Thuwunna Club)", gender: "Female" },
    { id: "p4", name: "Wai Yan Min (United Smashers)", gender: "Male" },
    { id: "p5", name: "Htet Htet Aung (Royal Star)", gender: "Female" },
  ];

  // Check if current category is a Doubles event
  const isDoublesCategory =
    categoryData &&
    (categoryData.toLowerCase().includes("doubles") ||
      categoryData.toLowerCase().includes("xd") ||
      categoryData.toLowerCase().includes("pair"));

  const paymentDetails = {
    "KBZ Pay": {
      name: "Ko Kaung (NYX Operations)",
      phone: "09 253 748 384",
      note: "Min Thant - MANDALAY26 to speed up auto-verification.",
      qrText: "Scan with KBZPay App for instant direct account confirmation",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAkFBMVEUAU6v///8AS6kAR6d/l8eSp9D///0ASagATambrtMAUKrE0eIGUKh+m8V2kMKOo81siMBDcbS7xtwAO6Tf4+3Y4usdVqsAO6AARKbP2OsAQaXy8/ZngLwyX62qutnZ3uvn6/KrwNpfg71HbrafsdBLdbQ6Z7GKmMdaerkANKEfW61TcrW1wt30+PaPpslljMAWnB/4AAAK5ElEQVR4nO1cDXeiOhOGoCEGKpYiIohQta7rR+///3dvJh8QEBB7rXrf4+zZs10ayOPMZDLzTMQwS8EYmw8SbOpTG9XfZZ+j4d1l9JlVtaFAsauJv4o+YusBEn/EX8fcLLRlFOrz1zYyHibE2n4WNjSkmvJVTB8HiYlrxOupVJbU1HRtPRQSF5Q6JShsTt0HWq4UGjFUmIPCZr5+CkwM1T4zsdTU4glsJwRtT9J8fvxoLKVEGwEqWT923VUlZfHKwKZvPxqILkxVmIFaPYmXCyEpaAo/kUeBfOTYMLOPR8OoSnxkjn58Mk1Z3wzU6GmClBA0YKCGT7X4FKin1NQL1GV5georL1B95QWqr7xA9ZUXqL7yAtVX/hugXETpWW1DQIr/UWTblq0JcevjbaQPKH+uTa6PsMpZ66AoHTrOd1itTaPd0TkWhb2d/hnp4v1Z7GOij7d3o2aZVIaFw8ovx8WkNVDUdYCIyQwdle1BdZ+MxRPR4nTGiybOhJbzoVHSxms6GiqaVp8zDVtAIU8waLpBo6G4FoTiUblZYWvlz867sg3amWYLnYuxp7mGPT7pA1tBEV8MmJeg0EjduBc3NE0IfOlBzheNWvQEw3zdBGiH+4AS1jPNoFBz9CbIZGwm3NNsr0kN8PA8daW1zTbim4GqeFWk6+oiqEzeS62RpNYx3hCjFRQXySfRtM2lmIyqK9te4OtBRZ7wD/bXEUuyCZR8MDaEqsgkqA3BaliyrXFOmq56gqLWRj2POUNpHLiSbN+FrIaBQjWRaiDG+l2XrSNB4cFZmLZW6u6eoOLSO3wkP2IBKiJCUBTOJfDvIjhSokksb8HmpqEUt8ZXmS9eKnfCG4WpBKWtz52as3G7it6UMf2o6ffWQrhtL1BRqaeNXbhCCaq45AIfCNLISVg75VlZ2ExiSl1dBoWMaFk48Zv2CRtAkXcZ43eV9S4n2Km1mLdgAl2Bt/fQVKQcgUVh3SqlT8kpqPtXLocTPZ+VULUMkl07h2mPcR9QsyXv/cEqXlQ8oQBlh0K2C94jYBcbaC66n6tG3q4rP4qYPi+D8pSPJ+PqwxQonAkJpD9hM9ufTzY7Kn1/d7OFTFcXQWEVx01vVru7NKsYIEMjdtC58dBSjfMaF54m0cIrsrI2UKYCl7/XNgaviM9YQBe4lvUMDiYaYLlvOpcwMe9rTfIUqEKwmRvVBK5lQ8bZmSOjSRF6G5ZAh3SAEh8SNnY929XMp3QltXXaVN2GvCfyOYl7XZelU1PcMMwyuu4LUOfqMjf63FSFVDNfN8SvH4KaiwjDdDHW3KUICSrBHm783BRB4aRFTxo66vaOAHUtKH+WKn0khxJVAepvJPrkUfxB3+QaKzt0VOawkBlcdvK+oD5Z4uKpvGUaNux92lPijYqoahzaqJAxup6kbwaF8RJ2Ebn9MSmrkIa9j+llJ11M5XCWp/R0vFpPrZqa8jVMSaZQFVtIM6iv6paMJmrhOa278PWgZOFA1olKdceoA1T8Jr1PVDToS2UGQXjlwusCpXJ0e6JUlch2fAFqhgj7g9hfmxwUiBTuI9tABYOthfggMZL01NoFUCz7VKiyfaVwSBYTJZ5fIOdOTaam9KhROQhkse3HpFwCZRjFehSlQxnR1XUtjvKQYI8qW7YuSb9+2UVQBKo4sd+siNG0zai52XYCfu7ulfHwuRQFz09AlRUyq+JOchK+3cjF3ihLuIse2mvReoXcD5TiEjLN+JbiBpaxuKFNfBvsS9edoPr4ep11GYj8ztNtjxxxkZvPTac1uwjnwcFEPoU6TYaTdh78wHzwRFBU5fPQlMfQo7hIDqdzFeT+eK+mo9v8fIBSZq+wdQbKHvvOoJaTUXfo+BO1rxF39VaRyS5F+hE1SmsDCul59OiciLUs2zozvIUi7XnIrgg6C4q1ASU52gvTf4Qd7iE6eUHoden3L4GiaWXn2B1ScuvjO1eDcrfVY6JJEjhjdNvTFleDQuP6lgYk7IDW+f27g6rBgvh5tG+I6iegWIm+W0iZDP0c994/fhOU6UdIiU3StwQKV+92ceWHoPT15kYpZHX4J9n4r4Fi19agq5qq3J872U1AGTFLNvG8uEgtC4X7vUEsnR5CxD7TZdO1W4FiJVbRBqHIPfzx50GeB9lyvC9WJRlPnbSGAE2mTp3uvxkozg+LE6wkHWVF/GJIR3IbciH3q2UuLjk1Hsa9FagAGAdQyn5eS6GcVHQvIEtOqvyLPYZy9fdAsWCVHCifGzSU+cvN5phxJjcTjkUgfVxWEECO2pSL3gYUAbI84IUhXZ6yt21IIYK5Xw7vaIpqEJowyb7CQPC7Gua4CShOcMvGpZ1Sq3Bu68j2JLkC7KzWGeXHqZuOc94oToFCBjJVqNB5ISARPAQUJRXF2EBU7H8pJERrKD+TRqbAgopM8JOuC8NKVhBNwM1nDTf9LHXxLSqFILQfQDw3xxWg/JfwbwoLULi3DQCzkuyDUmzRlLbXQV0kRoSmwlTK+z+bgBd+GmHnojhy9ymL6FFs2eDM6sB0ztArBpQCeZw17kX1sn33dSGJ5KlLyf1LAlljLqidDvwAquRTnvneuwYKebgs3OEovPmncbZ62e4knY0dqal65pmtyiegUa6PAIpPgaL7HOOT3FdiZnTcPNcZKPMCKq6pWnW8Kgs6uhU9rSQI2O6XCMyF+aIhNEy4V6FJsQIugYKqPd91WZA7erBUMnqbpHqNaXFMzni9D8N0e5iMHB0UPx2QiyDrQwuw2YPPqSD2kC42Xqy+mTzMY9XKYwvYq2QRE2iduGxx2n9zDZSBWLzEQ8S5GYydlk/fwE9hs965qoE6j+ilQKx80zc4qwKKM7sBlYdqJv1BdeuqExRnZINQv2TpIYFzqBgCaAR2bKPYG5k8pqvWyNANagV0j25PN6yCImv29LkFJ4faexEtHQeztcvTDWpS56B4FNdAGejILiws38R5Q87ZBQp01bIGO0HxZGSq7bGEfwetAgqUeYRV6LeGnvYu1qlZV92OzpOCYeHotljNOigjcqBfyS6/t7JVbaAw6Krpo3SDsr7ZnacBsQns1fYXw3iqaoqpim1O7GLW3knq6oyemiwo4lT74uRfGcy8xeGw8ObMN7/zmqYkrYo7KNnOHnLeYMELcYpuM75NJ0lywtyUSR0UgqMtLB1tz0e6u+2n8wXCq5Jh+6ckZJkUp7icXRRNz6ooC2qwTcfhiToob16RhlVLJvNNV9blku1wnjNNBcsdS43pl3PcVrOmGD55h6LOkjxrpstHUw6GZheandSaWeGezCKRe37Uvt7MA2fn6YnfYofd1qMILoQJPOlir+9IWZMognPJ8QZOHXZyt/cDRXbOcbJe73yG6dR9fOKOmpqq5Nms9qMeCQrOOIpDRPhSf/SO5lv7iQhebbndA0ABm7Ze/bNKycW20X0bRnAQoAdd+3/Txfp1eYHqKy9QfeUFqq+8QPWVF6i+8sSgnvElDj84tPqrwkF9PtuLQTzzOV+h8pwvmzEPPzlM+2tCQ/4Co+NTxQT72wRN5dtbHur5txIG4qVYyyfyKn68lb8+bP00oYoC8y5etDbtIrHuKdRwihetmU70HKh44754eZ+z7+SM7iPEXWpvFISTFtsHv+bQMCL5ZRvt1ZmnTWo9MIpSK/QS1XVVb6lk/8036Uds2ej+YsUf7ndWfiGg+pLR3P8ePEC+j9Wj2TqoetP6jlKd+n82c7/f9NGGBgAAAABJRU5ErkJggg==",
    },
    "Wave Pay": {
      name: "Ko Kaung (NYX Wave Account)",
      phone: "09 791 234 567",
      note: "Min Thant - MANDALAY26 (WavePay)",
      qrText: "Scan with WavePay App for instant verification",
      logo: "data:image/jpeg;base64,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",
    },
    "AYA Pay": {
      name: "Ko Kaung (NYX AYA Corporate)",
      phone: "09 421 987 654",
      note: "Min Thant - MANDALAY26 (AYAPay)",
      qrText: "Scan with AYAPay App for instant verification",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAACUCAMAAAD/A6aTAAAA9lBMVEX////HDSbMDijTDyq8DCK2CyC/DCPYDyzeEC6vCh3EDSWsChzlETHPDimlCRqiCRmsAADPAACkAACbAADZACLYACb++fq7AADmu76yAAD32NzaOEDVAADNAB347O333eDFAADlACbGAB/idYHLAA/35OauABXkrrL1zNG6ABnoRFGzAA3KdnjgpKnpxMfoy82gAA/hjJPgXmzfUl7XS1DWQUfvnKTwsrntjJbUITXmTGDsgo3TTFrZABHXZW/2wsbkAADrbnflJD3JKzTDREnQbG/akpTbMkjYPVDZe4S2LTLFXmC/M0HIT1m2SUq7X2OwNzfFhYZRWSYMAAAKb0lEQVR4nO3ce1uiShwHcCttVy0vqKBuIKKopHjJkr1krjdKK6v3/2YOqOgMDIIwqJxnv3+c5+zz4G6fZn4zwwwSCPzLv/zLv+wbkuELhUJ+mQLPM+Sxf6B9QuYHUqd0172/f3h4+LGN8qf7bvfuT0+qFU4bxEs/u7/oMl1OpzPopJcpl0e///Rqp9c8JFPrPdJsskxfAPlmzPd10v2bm5vRS0nKM+RpaJQSqD7RySR9ca3kYrfjO5iMgulfdTuDwtEbhqmJd2W2fL3JPg41V8X+3+LdTynPHw+RF6e/kuXr8+tr544VpX877A2OUvvkoPNIl7nzZdw5VEmxOOr+6eUPjZCexjR9vol9hxnkSqFc3Q6lQ/YuaXJGc+dgXHaspWMpGQ2lA3Wu1iPLnSkxY7hwqJT+qFTwHsFPWfpsFW8cV1f9v8+St6MwI47Zs23w96t1k/y97Xk4ctWeWC5ydgCH0rcUiDcIsjpmIxGI4Z1Dgfz2ZNziO5wQWeYwDmXgGg6w96z8KxfRgsGBhlzpIKMSg1dRexMikYM7FMgAp6JJ1yMRNw67HUvvuPr7E6OCFSKRvR2OCsTo+I2rYymKy8tDOYwd6zeeNWMrqCiO6Ojf4iiQwqR+eYlwmEIUCUevg6c9MDiYqXB5iXSgJ0LlnjaZvH6+f3x8fHl5HmWSq/TT6Yzd8QrhcNuvSFkIXpo4jO1BJ8svyk1pQd2bYnglBXW7qiaJvdLd87f0zc1NX6ex6Xh2WefNoBC06yizjxKP3u0g1fD5QW/4omCSgMVmffx2peDfc8Eg4DDvWBzNzewtgphar/S83tGyPfD+7blQkOJSYe7YKOixTYSWvFTq/hh9V0vGXoO4KI+CIAR1DmRzcPRd08lfL/0c3o+K6YwNR3HonDGlgkG9AwGhxx2nJUjmpc7wud9PWzlcLK/yuWDQ0qEoHtxtBPA1qdP9jpDAjj9O/5EnkGHasbg397MTWahJdzcGCMRwuihhcqGgtYMb11wrVv/cYGQoEsghOft7Z7lQKGTpoCz+diY/kKTerKRm1utJ0mBQq6mnN8Y+Mujv6lf9n456FTMXQtYO1nRAJ5l87+lXkmXVxUh5ldXKRJnNlf+s/q+f/jZ6funeDUul25udA1ax62iXoRoOhSwd1JPJ76AgKYRkmbax4F0e4PTRoxXgKI4c9d6GELJ0cGPkpMc3SxfqdjvmO1snDP5dY5g4VAhbRX2yesdq2+04HBqk6GREzM43DFMHNTVOe6T0xNH2btH3dTgZqsRgKGThECLGJQgzG9OIGyksd4S9/YcqspELWTmomaEx+Aea22PLZK/26Dtg8K/1kIVDCGb1n2px3GbRa6s99nE4YbQmlVDIFLJk1A2V0QQU+B1OpvGsXmF0RETdZ2oP5jvuOBwOBtxqzsDQOYSJbq1WeC+jbtBxDbzFZwdrQxHBgAtEmMKfIGcUeqMBBXHgKA73PykgZRQDduj6VFXgjBsNGLeqnSwNmY6AYgCOyzG8UuPfNkcHpg53BeKgwslOIrzbIUzgT8gUasMEnyPddVAaTCMR3u2od2B3Drljgs9R/LO/YsXY6aBa0Ac6VMRTx9XIyYpqxUA7VpAcVHB8WbdhgmMCgfuUkxPNNcO8PYQ3XWPYPjowHXd3QtKOjp00hml7UNCsQU64XTujGBwjR3ewG4aZg4JmjWZo9w6v64V7v+REocwbGsMEQkG3GrJgsVO9Y0K3VSA3zrYlSXnLQDmCOajiNmc5HrXHjdMDWRFgIBzBHHhxYbLfkdS+jnTa6cZnFWQYHcIYvDg73jC8cHzrO9ww1DMMjvo7eLFcN99xx/BMQ3/oeKu7WgnvcuRm4MUdKmj7aG1/R/qH8yOa5nynIycD1zLTehCrA4JkMg7uwbXkFzoG7MiB0wb/WtfvYGGcCNNunuPhX4noDkcO3C7MTwTdDpbd9rDhSL+4ec6NbCSiOxw5cG+n+WY4IsQ2YGVod8cnXwrD3AExsiGNgX3AyvRdHmWJ4fAORwL8HVU3CtyOTNrxjLFOdl6Jmjty4JIKZGAdeNPf3JzqL1NYLBl6RxjRqWAGPkf6l2tFgPxYMdANkoAZ1keEDhz0DxxPrH+ZMMIoxo6jnL0H3mtNgeUB1mosGjVtDwMDo2PFKDvZ60SE/6yYO4wMl45rnSPZxfUs8WLLMDh0jKAzhxnkIkO7L24t6jxu5oAY2eDqgA2Xg6a7mJ58UFMjoqaOBLimUmbxED7HRXncwfqUPcSAHQlwhdvcHNpicND0tIn3EfsPcwfMeEMfoVs8TIYasLjkcxXz8/WBbCpq5oAYhXfguNOVg6U7+L9+QsKtAToSutumkBuHBqHZp7wXXwZqmDoS4E2s7vDZVoEYHRz7gPVrDts0iZiJIwFu4fJTyzN0SwdNj/UHu9jCTNomjgS4wUM2YMb+AxbNPXS8+24ZKRMxtKMOngvoHszY20HT9x5UNpAWEY3pIUtGpQJe9mU4tt1j4OXYF9njr/XyH0pzIB0EeBni9Nmug2N/iZ4MT1CqSwbCkQAnKRl1+mzHwbHnHe8RSq9atBEOBUKA/UBEnoFYOs7YcgfxAKgHIb9QzaGEAA9is3MUw6LQOUowPo/lVbJzZHNEoSVu89P4vI+FgxPGHg6xhjAfK4bekQBP91uTisUzDXC/EuqRd/mwL4IQY1pgxgdwDa/uWyMdxofJLi8Faj7Dvoy1CrMucp2jvgCuIV8rYYtnMzaOOvUmY76hsJV1kesc4Tl4TaMeNnPA7UFR79VDjLDGMFsG6IAmDrEStuEQKGrWOnRv2qSBdBBgiebnYSuH0hBj8ZivqmFSMYSDAEdcUjubMnEIQj00w7jb4ShTlIP4Ai/52vFshlAX5q/VY78ySOkyQK/aOOoN8BJ+c/5sNExe5QO8O8Q6ZCNldFQW0DXvKEcll5s0xNbxG2KVVrttcFQ+oZ+ukKjoHPVcYt6oHm9kMoaBmyO2mjjgex1561C3qpV2kJv5EzKoac6h5lhC4vCD9oxMrB2VRIJ6FVtHfw+YMUyDMDAqMnwNWa0QCSVEfZo9QcIyrU9dc8SixIfhqnxVFptHfIWZdb5SOkas8nGiv/JdMTZHZXESs8Ge+WrHYUZ7bvgyjQ/Cf8biMCTs2W6llxFTcdhR/7L+0AmmEoMdRMOHNa7MgWpzAI724tCvIsSTBuxox/xY48ryL96GHBVf1niAFIk46CBkXxZHgH9ddisNQnyc9MLDPNVVt4prE2DL+iOnGKYBN4eTl6ScQpSlVXwLSYn+LA51pRvfOojGid3e2Q65aAOOqE9rXJvL146UT2s8oM3lK0fKnxOgGmaxdRCvfq3xQCC7qY54O+rXGlePNbfN4ePiCBQ+N46UbH35ySabimmMN+urTzZAt0r5t8aVbqUtdeMpf946rZONr7tVqmF98QlH61axz2P/JK6iTYKxuD/3FbQUUv+DIVeJvHK0jRvrvgr5sXT4dbdqE345mcfiqBef+SnZubpIbH/5eQYMqM+3Lmvcr9s8mzBqebQXPl7lrtJSyqP96ddtnm3yH6mU34eqZeTY8e/H/wPKvAwKH76D/QAAAABJRU5ErkJggg==",
    },
    "Cash on": {
      name: "Counter Payment at Stadium 1",
      phone: "In-Person Verification",
      note: "Bring exact cash amount to tournament control desk before deadline.",
      qrText: "Present your NYX ID at the venue registration counter",
      logo: "data:image/png;base64,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",
    },
  };

  const currentPayment = paymentDetails[selectedGateway];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPayment.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSlipFile(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for Doubles partner selection
    if (isDoublesCategory && !selectedPartner) {
      setErrorMessage(
        "Please select a team partner for this Doubles category.",
      );
      setShowErrorModal(true);
      return;
    }

    if (!slipFile) {
      setErrorMessage(
        "Please upload your payment screenshot or slip before submitting.",
      );
      setShowErrorModal(true);
      return;
    }

    setShowSuccessModal(true);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "16px 24px 40px",
        background: "#f7f8fa",
        color: "#172033",
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: "0",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Header Info */}
        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "900",
              color: "#172033",
              margin: "0 0 4px",
            }}
          >
            Tournament Enrollment Portal
          </h1>
          <p
            style={{
              fontSize: "13.5px",
              color: "#596170",
              margin: 0,
              fontWeight: "600",
            }}
          >
            Secure your slot & complete registration fee payment for upcoming
            seeded brackets.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          {/* 1. Registration Summary & Partner Selection */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #eef0f3",
              borderRadius: "12px",
              padding: "18px 24px",
              boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "900",
                  color: "#172033",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    background: "#ae1236",
                    color: "#fff",
                    width: "5px",
                    height: "16px",
                    borderRadius: "3px",
                    display: "inline-block",
                  }}
                ></span>
                1. Registration Summary & Player Info
              </h3>
              <span
                style={{
                  background: "#fde9ee",
                  color: "#ae1236",
                  fontSize: "11.5px",
                  fontWeight: "800",
                  padding: "3px 10px",
                  borderRadius: "6px",
                }}
              >
                NYX ID: #YGN-8842
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "16px",
                background: "#f8f9fa",
                padding: "14px 18px",
                borderRadius: "10px",
                border: "1px solid #edf0f3",
                marginBottom: isDoublesCategory ? "16px" : "0",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "10.5px",
                    fontWeight: "800",
                    color: "#727987",
                    marginBottom: "3px",
                  }}
                >
                  PRIMARY PLAYER
                </div>
                <div
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "900",
                    color: "#172033",
                  }}
                >
                  Min Thant Aung
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "10.5px",
                    fontWeight: "800",
                    color: "#727987",
                    marginBottom: "3px",
                  }}
                >
                  TEAM / CLUB
                </div>
                <div
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "900",
                    color: "#172033",
                  }}
                >
                  📍 Yangon Club
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "10.5px",
                    fontWeight: "800",
                    color: "#727987",
                    marginBottom: "3px",
                  }}
                >
                  TOURNAMENT
                </div>
                <div
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "900",
                    color: "#172033",
                  }}
                >
                  🏆 {tournamentData?.title || "Mandalay Open Cup"}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "10.5px",
                    fontWeight: "800",
                    color: "#727987",
                    marginBottom: "3px",
                  }}
                >
                  EVENT CATEGORY
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#ae1236",
                    background: "#fde9ee",
                    padding: "2px 8px",
                    borderRadius: "6px",
                    display: "inline-block",
                  }}
                >
                  {categoryData || "Mixed Doubles"}
                </div>
              </div>
            </div>

            {/* Doubles Partner Selection Dropdown (Only appears if it's a doubles category) */}
            {isDoublesCategory && (
              <div
                style={{
                  background: "#fff9fa",
                  border: "1px dashed #ae1236",
                  borderRadius: "10px",
                  padding: "16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <label
                  style={{
                    fontSize: "12.5px",
                    fontWeight: "900",
                    color: "#ae1236",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <GroupAddRounded style={{ fontSize: 18 }} />
                  Select Team Partner for {categoryData}{" "}
                  <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <p
                  style={{
                    fontSize: "11.5px",
                    color: "#64748b",
                    margin: 0,
                    fontWeight: "600",
                  }}
                >
                  Choose a registered partner from the portal network to
                  complete your tournament pair registration.
                </p>
                <select
                  value={selectedPartner}
                  onChange={(e) => setSelectedPartner(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#fff",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#0f172a",
                    outline: "none",
                    marginTop: "4px",
                  }}
                >
                  <option value="">
                    -- Choose Partner from Registered Accounts --
                  </option>
                  {availablePartners.map((partner) => (
                    <option key={partner.id} value={partner.name}>
                      {partner.name} ({partner.gender})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* 2. Choose Payment Gateway Method */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #eef0f3",
              borderRadius: "12px",
              padding: "18px 24px",
              boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "900",
                color: "#172033",
                margin: "0 0 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  background: "#ae1236",
                  color: "#fff",
                  width: "5px",
                  height: "16px",
                  borderRadius: "3px",
                  display: "inline-block",
                }}
              ></span>
              2. Choose Payment Gateway Method
            </h3>

            {/* Gateway Cards Layout - 4 columns full width */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "12px",
                marginBottom: "18px",
              }}
            >
              {Object.keys(paymentDetails).map((gateway) => {
                const info = paymentDetails[gateway];
                const isSelected = selectedGateway === gateway;
                return (
                  <div
                    key={gateway}
                    onClick={() => setSelectedGateway(gateway)}
                    style={{
                      border: isSelected
                        ? "2px solid #ae1236"
                        : "1px solid #e2e8f0",
                      background: isSelected ? "#fff5f7" : "#f8f9fa",
                      borderRadius: "10px",
                      padding: "15px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.2s",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={info.logo}
                        alt={gateway}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "1px solid #cbd5e1",
                        }}
                      />
                      <span
                        style={{
                          fontWeight: "900",
                          fontSize: "17px",
                          color: "#172033",
                        }}
                      >
                        {gateway}
                      </span>
                    </div>
                    {isSelected && (
                      <CheckCircleRounded
                        style={{ fontSize: 18, color: "#ae1236" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Official Transfer Details Box - Full Width Grid */}
            <div
              style={{
                background: "#f8f9fa",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "20px 24px",
                display: "grid",
                gridTemplateColumns: "1fr 280px",
                gap: "30px",
                alignItems: "center",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "900",
                      color: "#172033",
                    }}
                  >
                    {selectedGateway} Official Transfer Details
                  </div>
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: "800",
                      color: "#475569",
                      background: "#e2e8f0",
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    🔒 Official Escrow
                  </span>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "10.5px",
                      fontWeight: "800",
                      color: "#727987",
                    }}
                  >
                    ACCOUNT RECEIVER NAME
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "900",
                      color: "#172033",
                    }}
                  >
                    {currentPayment.name}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "10.5px",
                      fontWeight: "800",
                      color: "#727987",
                    }}
                  >
                    {selectedGateway.toUpperCase()} PHONE / WALLET ID
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15.5px",
                        fontWeight: "900",
                        color: "#172033",
                        background: "#fff",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                      }}
                    >
                      {currentPayment.phone}
                    </span>
                    {selectedGateway !== "Cash on" && (
                      <button
                        type="button"
                        onClick={handleCopy}
                        style={{
                          background: "#172033",
                          color: "#fff",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "6px",
                          fontSize: "11.5px",
                          fontWeight: "800",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <ContentCopyRounded style={{ fontSize: 13 }} />{" "}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "10.5px",
                      fontWeight: "800",
                      color: "#727987",
                    }}
                  >
                    TOTAL ENROLLMENT FEE
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "900",
                      color: "#ae1236",
                    }}
                  >
                    25,000 MMK
                  </div>
                </div>

                <div
                  style={{
                    background: "#fff5f7",
                    border: "1px solid #f8d7da",
                    borderRadius: "6px",
                    padding: "10px 14px",
                    fontSize: "12px",
                    color: "#991b1b",
                    fontWeight: "700",
                  }}
                >
                  ⚠️ <b>Note:</b> Type reference note:{" "}
                  <span style={{ fontFamily: "monospace", fontWeight: "900" }}>
                    {currentPayment.note}
                  </span>
                </div>
              </div>

              {/* QR Code Image Box */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  background: "#fff",
                  padding: "16px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                }}
              >
                <div
                  style={{
                    width: "140px",
                    height: "140px",
                    background: "#fff",
                    borderRadius: "8px",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=NYX-Badminton-Payment-Escrow"
                    alt="QR Code"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "10.5px",
                    fontWeight: "700",
                    color: "#64748b",
                    marginTop: "10px",
                    lineHeight: "1.3",
                  }}
                >
                  {currentPayment.qrText}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Upload Payment Slip / Screenshot */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #eef0f3",
              borderRadius: "12px",
              padding: "18px 24px",
              boxShadow: "0 4px 16px rgba(20, 30, 50, 0.03)",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                fontSize: "15px",
                fontWeight: "900",
                color: "#172033",
                margin: "0 0 4px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  background: "#ae1236",
                  color: "#fff",
                  width: "5px",
                  height: "16px",
                  borderRadius: "3px",
                  display: "inline-block",
                }}
              ></span>
              3. Upload Payment Slip / Screenshot{" "}
              <span style={{ color: "#ae1236" }}>*</span>
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "#727987",
                margin: "0 0 12px",
                fontWeight: "600",
              }}
            >
              Please upload your successful transaction screenshot or slip (JPG,
              PNG - Max 5MB).
            </p>

            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: slipFile ? "2px solid #21865b" : "2px dashed #cbd5e1",
                borderRadius: "10px",
                padding: "22px",
                background: slipFile ? "#e7f7ee" : "#f8f9fa",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {slipFile ? (
                <CheckCircleRounded
                  style={{ fontSize: 34, color: "#21865b" }}
                />
              ) : (
                <CloudUploadRounded
                  style={{ fontSize: 34, color: "#ae1236" }}
                />
              )}
              <div>
                <div
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "900",
                    color: slipFile ? "#21865b" : "#172033",
                  }}
                >
                  {slipFile
                    ? `Selected File: ${slipFile}`
                    : "Tap or Drag Payment Slip Screenshot here"}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#727987",
                    fontWeight: "600",
                    marginTop: "3px",
                  }}
                >
                  {slipFile
                    ? "Click to change image"
                    : "High resolution clear capture of transaction ID & date"}
                </div>
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          {/* Confirm & Submit Button */}
          <button
            type="submit"
            style={{
              background: "#ae1236",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              minHeight: "52px",
              fontSize: "14.5px",
              fontWeight: "900",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(174, 18, 54, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background 0.2s",
              width: "100%",
            }}
          >
            CONFIRM & SUBMIT TOURNAMENT ENROLLMENT{" "}
            <ArrowForwardRounded style={{ fontSize: 18 }} />
          </button>
        </form>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(9, 17, 29, 0.6)",
            backdropFilter: "blur(5px)",
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "30px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "#e7f7ee",
                color: "#21865b",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 16px",
              }}
            >
              <CheckRounded style={{ fontSize: 32 }} />
            </div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "900",
                color: "#172033",
                margin: "0 0 8px",
              }}
            >
              Enrollment Successful!
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                margin: "0 0 24px",
                lineHeight: "1.5",
              }}
            >
              {isDoublesCategory
                ? `Your pair registration with ${selectedPartner} has been submitted successfully.`
                : "Your tournament slot & payment slip have been submitted successfully."}
              Our admin team will verify shortly.
            </p>
            <button
              onClick={() => navigate("/tournaments")}
              style={{
                width: "100%",
                background: "#21865b",
                color: "#fff",
                border: "none",
                padding: "12px",
                borderRadius: "10px",
                fontWeight: "900",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Return to Tournaments
            </button>
          </div>
        </div>
      )}

      {/* ERROR MODAL */}
      {showErrorModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(9, 17, 29, 0.6)",
            backdropFilter: "blur(5px)",
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "30px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "#fef2f2",
                color: "#dc2626",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 16px",
              }}
            >
              <WarningRounded style={{ fontSize: 32 }} />
            </div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "900",
                color: "#172033",
                margin: "0 0 8px",
              }}
            >
              Action Required
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#64748b",
                margin: "0 0 24px",
                lineHeight: "1.5",
              }}
            >
              {errorMessage}
            </p>
            <button
              onClick={() => setShowErrorModal(false)}
              style={{
                width: "100%",
                background: "#ae1236",
                color: "#fff",
                border: "none",
                padding: "12px",
                borderRadius: "10px",
                fontWeight: "900",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Got it, I'll Fix
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
