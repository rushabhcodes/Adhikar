import 'package:adhikar/utils/colors.dart';
import 'package:adhikar/widgets/lawCard.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class LawScreen extends StatefulWidget {
  const LawScreen({super.key});

  @override
  State<LawScreen> createState() => _LawScreenState();
}

class _LawScreenState extends State<LawScreen> {
  List colors = [
    const Color.fromARGB(255, 97, 160, 219),
    const Color.fromARGB(235, 247, 93, 93),
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        systemOverlayStyle: const SystemUiOverlayStyle(
            statusBarColor: primaryColor,
            statusBarIconBrightness: Brightness.light),
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text(
          'Law',
          style: TextStyle(color: Colors.white),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          children: [
            const SizedBox(
              height: 20,
            ),
            TextFormField(
              cursorColor: Colors.white,
              decoration: InputDecoration(
                prefixIcon: Image.asset(
                  'assets/icons/ic_search.png',
                  height: 20,
                  color: Colors.grey,
                ),
                enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: const BorderSide(color: Colors.grey)),
                focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: const BorderSide(color: primaryColor)),
                hintText: 'Search',
                hintStyle: const TextStyle(color: Colors.grey),
              ),
              style: const TextStyle(
                  color: primaryColor,
                  fontSize: 16,
                  fontWeight: FontWeight.w300),
            ),
            const SizedBox(
              height: 10,
            ),
            Expanded(
                child: ListView.builder(
                    itemCount: 10,
                    itemBuilder: (context, index) {
                      return LawCard(
                        color: colors[index % colors.length],
                      );
                    }))
          ],
        ),
      ),
    );
  }
}
