import json
import matplotlib.pyplot as plt


# number of transfers per payer_type : payer_type
def payer_type_statistics(data):
    left = [1, 2, 3, 4]
    tick_label = ["EMPLOYEE", "STUDENT", "OTHER", "RETIRED"]
    payer_types = list(map(lambda x: x["payer_type"], data))
    heights = [payer_types.count(payer_type) for payer_type in tick_label]
    print(heights)
    plt.bar(
        left,
        heights,
        tick_label=tick_label,
        width=0.8,
        color=["green", "blue", "grey", "brown"],
    )

    plt.xlabel("Types of payers")
    plt.ylabel("No of transfers")
    plt.title("Frequency of payer types")
    plt.show()


# percentage of total sums transfered per payer_type : sum, payer_type
def sum_statistics(data):
    left = [1, 2, 3, 4]
    tick_label = ["EMPLOYEE", "STUDENT", "OTHER", "RETIRED"]
    sums_transfered = [
        sum(
            map(
                lambda x: x["sum"],
                filter(lambda x: x["payer_type"] == payer_type, data),
            )
        )
        for payer_type in tick_label
    ]

    colors = ["r", "y", "g", "b"]
    plt.pie(
        sums_transfered,
        labels=tick_label,
        colors=colors,
        startangle=90,
        shadow=True,
        explode=(0, 0, 0.1, 0),
        radius=1.2,
        autopct="%1.1f%%",
    )
    plt.legend()
    plt.show()


def main():
    with open("data.json") as json_file:
        data = json.load(json_file)
        # payer_type_statistics(data)
        sum_statistics(data)


if __name__ == "__main__":
    main()
